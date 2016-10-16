/// <reference path="../model/IModule.ts" />
/// <reference path="../model/IControls.ts" />
/// <reference path="../model/IEmscriptenApp.ts" />
/// <reference path="MAMEControllers.ts" />
/// <reference path="Arcade6Buttons.ts" />
/// <reference path="Button.ts" />

namespace mamejs.control {
  export class Controls implements IControls {

    private _player1: IControl
    private _player2: IControl

    constructor(private _module: IModule) {
      this._player1 = new Arcade6Buttons(player1Controller, this._module)
      this._player2 = new Arcade6Buttons(player1Controller, this._module)
    }

    public get player1(): IControl {
      return this._player1
    }

    public get player2(): IControl {
      return this._player2
    }

    public triggerKey(keyCode: number): void {
      (new Button(keyCode, this._module)).pressAndRelease()
    }
  }
}
