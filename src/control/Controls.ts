/// <reference path="../model/IModule.ts" />
/// <reference path="../constant/MAMEButton.ts" />
/// <reference path="Arcade6Buttons.ts" />
/// <reference path="Button.ts" />
/// <reference path="GamePad.ts" />

namespace mamejs.control {
  export class Controls {

    private _player1: Arcade6Buttons
    private _player2: Arcade6Buttons

    private pauseButton: Button

    constructor(module: IModule) {
      this._player1 = new Arcade6Buttons(constant.player1Controls, module)
      this._player2 = new Arcade6Buttons(constant.player2Controls, module)

      this.pauseButton = new Button(constant.MAMEButton.PAUSE, module._SDL_SendKeyboardKey)

      //let gamepad = new control.GamePad(navigator.getGamepads()[0], this._player1)
      //gamepad.connect()
    }

    public get player1(): Arcade6Buttons {
      return this._player1
    }

    public get player2(): Arcade6Buttons {
      return this._player2
    }

    public pause(callback?: Function): void {
      this.pauseButton.pressAndRelease(20, callback)
    }
  }
}
