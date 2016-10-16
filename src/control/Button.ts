/// <reference path="../model/IModule.ts" />
/// <reference path="../helper/EmscriptenHelper.ts" />

namespace mamejs.control {
  export class Button implements IButton {

    private _pressed: boolean = false
    private _charCode: number

    constructor(private _keyCode: number, private _module: IModule) {

    }

    public get pressed(): boolean {
      return this._pressed
    }

    public press(callback?: Function): void {
      helper.EmscriptenHelper.simulateKeyEvent(this._module, 'keydown', this._keyCode, this._charCode || 0)
    }

    public release(callback?: Function): void {
      helper.EmscriptenHelper.simulateKeyEvent(this._module, 'keyup', this._keyCode, this._charCode || 0)

    }

    public pressAndRelease(callback?: Function): void {
      this.press()
      this._module.requestAnimationFrame(() => this.release())
    }
  }
}
