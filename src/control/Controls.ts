/// <reference path="../model/IModule.ts" />
/// <reference path="../model/IControl.ts" />
/// <reference path="../model/IStdout.ts" />
/// <reference path="MAMEControllers.ts" />
/// <reference path="Arcade6Buttons.ts" />
/// <reference path="Button.ts" />

namespace mamejs.control {
  export class Controls {

    private _player1: IControl
    private _player2: IControl

    private pauseButton: IButton

    constructor(private _stdout: IStdout) {
      this._player1 = new Arcade6Buttons(player1Controller, this._stdout.module)
      this._player2 = new Arcade6Buttons(player1Controller, this._stdout.module)

      this.pauseButton = new Button(PAUSE, this._stdout.module._SDL_SendKeyboardKey)
    }

    public get player1(): IControl {
      return this._player1
    }

    public get player2(): IControl {
      return this._player2
    }

    public pause(callback?: Function): void {
      this.pauseButton.pressAndRelease(callback)
    }
  }
}
