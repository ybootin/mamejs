/// <reference path="../model/IControls.ts" />
/// <reference path="Arcade6Buttons.ts" />
/// <reference path="Button.ts" />
/// <reference path="Keyboard.ts" />
/// <reference path="Joystick.ts" />
/// <reference path="Controllers.ts" />

namespace mamejs.control {
  export class Controls extends emloader.event.EventEmiter implements IControls {
    static JOYSTICKCONNECTED: string = 'joystickconnected'
    static JOYSTICKDISCONNECTED: string = 'joystickdisconnected'

    private _player1: IControl
    private _player2: IControl

    private _joysticks: Array<Joystick> = []
    private _keyboard: Keyboard

    constructor(private _mame: Mame) {
      super()
      this._keyboard = new Keyboard(_mame.loader.module)

      this._player1 = new Arcade6Buttons(player1Controller, this._keyboard)
      this._player2 = new Arcade6Buttons(player2Controller, this._keyboard)

      this.handleGamepads()
    }

    public get player1(): IControl {
      return this._player1
    }

    public get player2(): IControl {
      return this._player2
    }

    public get keyboard(): Keyboard {
      return this._keyboard
    }

    public get joysticks(): Array<Joystick> {
      return this._joysticks
    }

    private handleGamepads(): void {
      let connectGamepad = (gamepad: Gamepad): void => {
        // on connect, always get the control according to the gamepad index
        // for the moment, only 2 controllers are handled (this.player1 & this.player2)
        let control = this['player' + (gamepad.index + 1)]
        if (control) {
          this._joysticks[gamepad.index] = new Joystick(gamepad, control)
          this._joysticks[gamepad.index].connect()

          this.emit(Controls.JOYSTICKCONNECTED, this._joysticks[gamepad.index])
        }
      }

      let disconnectGamepad = (gamepad: Gamepad): void => {
        try {
          this.emit(Controls.JOYSTICKDISCONNECTED, this._joysticks[gamepad.index])
          this._joysticks[gamepad.index].disconnect()
        } catch (e) {
           console.error('disconnect gamepad throw an exception', gamepad, e)
        }
      }

      window.addEventListener("gamepadconnected", (evt: GamepadEvent) => connectGamepad(evt.gamepad))
      window.addEventListener("gamepaddisconnected", (evt: GamepadEvent) => disconnectGamepad(evt.gamepad))

      let gamepads = navigator.getGamepads()
      for (var i = 0, l = gamepads.length; i < l; i++) {
        if (gamepads[i]) {
          connectGamepad(gamepads[i])
        }
      }
    }
  }
}
