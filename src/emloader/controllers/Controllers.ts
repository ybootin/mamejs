/// <reference path="../model/IControls.ts" />
/// <reference path="Joystick.ts" />
/// <reference path="Keyboard.ts" />

namespace emloader {

  export class Controllers extends emloader.event.EventEmiter {

    static JOYSTICKCONNECTED: string = 'joystickconnected'
    static JOYSTICKDISCONNECTED: string = 'joystickdisconnected'
    static JOYSTICKBUTTONMAPCHANGE: string = 'joystickbuttonmapchange'
    static JOYSTICKCONTROLCHANGE: string = 'joystickcontrolchange'
    static KEYPRESS: string = 'keypress'
    static KEYRELEASE: string = 'keyrelease'

    public keyboard = new Keyboard()

    private _joysticks: Array<Joystick> = new Array(4)

    private gamepadChecker: number

    private keyHandler: IControlKeyHandler

    constructor(private mappings: Array<IControlMapping>) {
      super()
      for (var i = 0; i < 4; i++) {
        this._joysticks[i] = ((): Joystick => {
          let joystick: Joystick = new Joystick()
          joystick.on(Joystick.CONNECTED, () => this.emit(Controllers.JOYSTICKCONNECTED, joystick))
          joystick.on(Joystick.DISCONNECTED, () => this.emit(Controllers.JOYSTICKDISCONNECTED, joystick))
          joystick.on(Joystick.BUTTONMAPCHANGE, () => this.emit(Controllers.JOYSTICKBUTTONMAPCHANGE, joystick))
          joystick.on(Joystick.CONTROLCHANGE, () => {
            this.emit(Controllers.JOYSTICKCONTROLCHANGE, joystick)

            // prevent joystick use the same Controls
            this.getJoysticks().forEach((j: Joystick): void => {
              if (j !== joystick && j.getControlMapping() === joystick.getControlMapping()) {
                j.setControlMapping(this.getAvailableMappings()[0])
              }
            })
          })

          return joystick
        })()
      }
    }

    public setKeyHandler(keyHandler: IControlKeyHandler): void {
      this.keyHandler = keyHandler

      // redispatch key events
      this.keyHandler.on('keypress', (keyCode: number) => this.emit(Controllers.KEYPRESS, keyCode))
      this.keyHandler.on('keyrelease', (keyCode: number) => this.emit(Controllers.KEYRELEASE, keyCode))

      this.getJoysticks().forEach((joystick: Joystick): void => {
        if (joystick) {
          joystick.setKeyHandler(keyHandler)
        }
      })

      this.keyboard.setKeyHandler(keyHandler)
    }

    public getKeyHandler(): IControlKeyHandler {
      return this.keyHandler
    }

    public getJoysticks(): Array<Joystick> {
      return this._joysticks.filter((joystick: Joystick): boolean => {
        return joystick.isConnected()
      })
    }

    /**
     * return the joystick attached to the current mapping or null if not attached
     */
    public getJoystick(mapping: IControlMapping): Joystick {
      return this._joysticks.filter((joystick: Joystick): boolean => {
        return joystick && joystick.getControlMapping() === mapping
      })[0]
    }

    public getAvailableMappings(): Array<IControlMapping> {
      return this.mappings.filter((mapping: IControlMapping): boolean => !this.getJoystick(mapping))
    }

    public checkGamepads(): void {
      let gamepads = navigator.getGamepads()
      for (let i = 0, l = gamepads.length; i < l; i++) {
        if (gamepads[i] && !this._joysticks[i].isConnected()) {
          this._joysticks[i].setControlMapping(this.getAvailableMappings()[0])
          this._joysticks[i].setKeyHandler(this.keyHandler)
          this._joysticks[i].connect(gamepads[i])
        } else if (!gamepads[i] && this._joysticks[i].isConnected()) {
          this._joysticks[i].disconnect()
        }
      }
    }

    public bind(scope: Window = window): void {
      this.unbind(scope)

      // gamepaddisconnected/gameconnected event works very bad on chrome ...
      // this is bad, but this works well
      this.gamepadChecker = setInterval(() => {
        this.checkGamepads()
      }, 1000)

      this.checkGamepads()

      this.keyboard.bind()
    }

    public unbind(scope: Window = window): void {
      if (this.gamepadChecker) {
        clearInterval(this.gamepadChecker)

        this.getJoysticks().forEach((joystick: Joystick): void => {
          joystick.disconnect()
        })
      }

      this.keyboard.unbind()
    }
  }
}
