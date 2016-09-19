/// <reference path="../model/IModule.ts" />
/// <reference path="../model/IControl.ts" />
/// <reference path="MAMEControllers.ts" />
/// <reference path="Arcade6Buttons.ts" />
/// <reference path="Button.ts" />

namespace mamejs.control {
  export class Controls {

    private _player1: IControl
    private _player2: IControl

    private pauseButton: IButton

    constructor(module: IModule) {
      this._player1 = new Arcade6Buttons(player1Controller, module)
      this._player2 = new Arcade6Buttons(player1Controller, module)

      this.pauseButton = new Button(PAUSE, module._SDL_SendKeyboardKey)
    }

    public get player1(): IControl {
      return this._player1
    }

    public get player2(): IControl {
      return this._player2
    }

    public pause(callback?: Function): void {
      this.pauseButton.pressAndRelease(20, callback)
    }
  }
}
