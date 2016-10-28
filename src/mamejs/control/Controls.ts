/// <reference path="../model/IControls.ts" />
/// <reference path="Arcade6Buttons.ts" />
/// <reference path="Button.ts" />
/// <reference path="KeyHandler.ts" />
/// <reference path="Joystick.ts" />
/// <reference path="Controllers.ts" />

namespace mamejs.control {
  export class Controls extends emloader.event.EventEmiter implements IControls {
    static JOYSTICKCONNECTED: string = 'joystickconnected'
    static JOYSTICKDISCONNECTED: string = 'joystickdisconnected'

    private _player1: IControl
    private _player2: IControl

    private _joysticks: Array<Joystick> = []
    private _keyhandler: KeyHandler

    private _gamepadconnectedHandler: EventListener
    private _gamepaddisconnectedHandler: EventListener

    constructor(private _mame: Mame) {
      super()
      this._keyhandler = new KeyHandler(_mame.loader)

      // redispatch events
      this._keyhandler.on(KeyHandler.KEYPRESS, (key: string) => this.emit(KeyHandler.KEYPRESS, key))
      this._keyhandler.on(KeyHandler.KEYRELEASE, (key: string) => this.emit(KeyHandler.KEYRELEASE, key))

      this._player1 = new Arcade6Buttons(player1Controller, this._keyhandler)
      this._player2 = new Arcade6Buttons(player2Controller, this._keyhandler)

      this.handleGamepads()
    }

    public get player1(): IControl {
      return this._player1
    }

    public get player2(): IControl {
      return this._player2
    }

    public get joysticks(): Array<Joystick> {
      return this._joysticks
    }

    public pressKey(key: string): void {
      this._keyhandler.pressMameKey(key)
    }

    public releaseKey(key: string): void {
      this._keyhandler.releaseMameKey(key)
    }

    public destroy() {
      this._keyhandler.clean()
      this._keyhandler.unbindKeys()
      this.unbindGamepads()
      this.clean()
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

      this._gamepadconnectedHandler = (evt: GamepadEvent) => connectGamepad(evt.gamepad)
      this._gamepaddisconnectedHandler = (evt: GamepadEvent) => disconnectGamepad(evt.gamepad)

      window.addEventListener("gamepadconnected", this._gamepadconnectedHandler)
      window.addEventListener("gamepaddisconnected", this._gamepaddisconnectedHandler)

      let gamepads = navigator.getGamepads()
      for (var i = 0, l = gamepads.length; i < l; i++) {
        if (gamepads[i]) {
          connectGamepad(gamepads[i])
        }
      }
    }

    private unbindGamepads(): void {
      window.removeEventListener("gamepadconnected", this._gamepadconnectedHandler)
      window.removeEventListener("gamepaddisconnected", this._gamepaddisconnectedHandler)
    }
  }
}
