/// <reference path="model/IControls.ts" />
/// <reference path="Joystick.ts" />
/// <reference path="Keyboard.ts" />
/// <reference path="MameKeyHandler.ts" />
/// <reference path="ControllersMapping.ts" />

namespace mamejs {

  export class Controllers extends emloader.event.EventEmiter {

    static JOYSTICKCONNECTED: string = 'joystickconnected'
    static JOYSTICKDISCONNECTED: string = 'joystickdisconnected'
    static JOYSTICKBUTTONMAPCHANGE: string = 'joystickbuttonmapchange'
    static JOYSTICKCONTROLCHANGE: string = 'joystickcontrolchange'
    static MAMEKEYPRESS: string = 'mamekeypress'
    static MAMEKEYRELEASE: string = 'mamekeyrelease'

    public keyboard = new Keyboard()

    private _joysticks: Array<Joystick> = new Array(4)

    private gamepadChecker: number

    private keyHandler: IMameKeyHandler

    constructor() {
      super()
      for (var i = 0; i < 4; i++) {
        this._joysticks[i] = ((): Joystick => {
          let joystick: Joystick = new Joystick()
          joystick.on(Joystick.CONNECTED, () => this.emit(Controllers.JOYSTICKCONNECTED, joystick))
          joystick.on(Joystick.DISCONNECTED, () => this.emit(Controllers.JOYSTICKDISCONNECTED, joystick))
          joystick.on(Joystick.BUTTONMAPCHANGE, () => this.emit(Controllers.JOYSTICKBUTTONMAPCHANGE, joystick))
          joystick.on(Joystick.CONTROLCHANGE, () => this.emit(Controllers.JOYSTICKCONTROLCHANGE, joystick))

          return joystick
        })()
      }
    }

    public setKeyHandler(keyHandler: IMameKeyHandler): void {
      this.keyHandler = keyHandler

      // redispatch key events
      this.keyHandler.on(MameKeyHandler.KEYPRESS, (mameKey: string) => this.emit(Controllers.MAMEKEYPRESS, mameKey))
      this.keyHandler.on(MameKeyHandler.KEYRELEASE, (mameKey: string) => this.emit(Controllers.MAMEKEYRELEASE, mameKey))

      this.getJoysticks().forEach((joystick: Joystick): void => {
        if (joystick) {
          joystick.setKeyHandler(keyHandler)
        }
      })

      this.keyboard.setKeyHandler(keyHandler)
    }

    public getKeyHandler(): IMameKeyHandler {
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
      return Object.keys(ControllersMapping).map((key: string): IControlMapping => {
        return ControllersMapping[key]
      }).filter((mapping: IControlMapping): boolean => !this.getJoystick(mapping))
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
