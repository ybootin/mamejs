/// <reference path="model/IControls.ts" />
/// <reference path="Joystick.ts" />
/// <reference path="Keyboard.ts" />
/// <reference path="MameKeyHandler.ts" />
/// <reference path="ControllersMapping.ts" />

namespace mamejs {

  export class Controllers extends emloader.event.EventEmiter {

    static JOYSTICKCONNECTED: string = 'joystickconnected'
    static JOYSTICKDISCONNECTED: string = 'joystickdisconnected'
    static JOYSTICKMAPPINGCHANGE: string = 'joystickmappingchange'

    public keyboard = new Keyboard()

    private joysticks: Array<Joystick> = new Array(4)

    private gamepadEventHandler: {(evt: GamepadEvent): void}

    private keyHandler: IMameKeyHandler

    public setKeyHandler(keyHandler: IMameKeyHandler): void {
      this.keyHandler = keyHandler
      this.joysticks.forEach((joystick: Joystick): void => {
        if (joystick) {
          joystick.setKeyHandler(keyHandler)
        }
      })

      this.keyboard.setKeyHandler(keyHandler)
    }

    public getJoysticks() {
      return this.joysticks
    }

    /**
     * return the joystick attached to the current mapping or null if not attached
     */
    public getJoystick(mapping: IControlMapping): Joystick {
      return this.joysticks.filter((joystick: Joystick): boolean => {
        return joystick && joystick.controlMapping === mapping
      })[0]
    }

    public getAvailableMappings(): Array<IControlMapping> {
      return Object.keys(ControllersMapping).map((key: string): IControlMapping => {
        return ControllersMapping[key]
      }).filter((mapping: IControlMapping): boolean => !this.getJoystick(mapping))
    }

    public connectGamepad(gamepad: Gamepad): void {
      console.log('connect gamepad', gamepad)
      let joystick = new Joystick(gamepad, this.getAvailableMappings()[0])
      this.joysticks[gamepad.index] = joystick

      joystick.setKeyHandler(this.keyHandler)
      joystick.connect()

      this.emit(Controllers.JOYSTICKCONNECTED, this.joysticks[gamepad.index])

      // redispatch MAPPINGCHANGE globally
      joystick.on(Joystick.ONMAPPINGCHANGE, () => this.emit(Controllers.JOYSTICKMAPPINGCHANGE, joystick))
    }

    public disconnectGamepad(gamepad: Gamepad): void {
      console.log('disconnect gamepad', gamepad)
      try {
        this.joysticks[gamepad.index].disconnect()
        this.emit(Controllers.JOYSTICKDISCONNECTED, this.joysticks[gamepad.index])
        this.joysticks[gamepad.index] = null
      } catch (e) {
         console.error('disconnect gamepad throw an exception', gamepad, e)
      }
    }

    public bind(scope: Window = window): void {
      this.unbind(scope)

      let gamepadEventHandler = (evt: GamepadEvent): void => {
        switch(evt.type) {
          case 'gamepadconnected':
            return this.connectGamepad(evt.gamepad)
          case 'gamepaddisconnected':
            return this.disconnectGamepad(evt.gamepad)
          default:
            throw 'unknown event ' + evt.type
        }
      }

      scope.addEventListener("gamepaddisconnected", gamepadEventHandler)
      scope.addEventListener("gamepadconnected", gamepadEventHandler)

      let gamepads = scope.navigator.getGamepads()
      for (var i = 0, l = gamepads.length; i < l; i++) {
        if (gamepads[i]) {
          this.connectGamepad(gamepads[i])
        }
      }

      this.keyboard.bind()
    }

    public unbind(scope: Window = window): void {
      if (this.gamepadEventHandler) {
        scope.removeEventListener("gamepadconnected", this.gamepadEventHandler)
        scope.removeEventListener("gamepaddisconnected", this.gamepadEventHandler)
        this.gamepadEventHandler = null
      }

      this.keyboard.unbind()
    }
  }
}
