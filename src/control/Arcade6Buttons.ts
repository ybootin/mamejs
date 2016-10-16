/// <reference path="../model/IModule.ts" />
/// <reference path="../model/IControls.ts" />
/// <reference path="Button.ts" />

namespace mamejs.control {
  export class Arcade6Buttons implements IControl {

    private _start: Button
    private _coin: Button

    private _button1: Button
    private _button2: Button
    private _button3: Button
    private _button4: Button
    private _button5: Button
    private _button6: Button

    private _up: Button
    private _right: Button
    private _down: Button
    private _left: Button

    constructor(control: IControlMapping, _module: IModule) {
      this._start = new Button(control.start, _module)
      this._coin = new Button(control.coin, _module)
      this._button1 = new Button(control.button1, _module)
      this._button2 = new Button(control.button2, _module)
      this._button3 = new Button(control.button3, _module)
      this._button4 = new Button(control.button4, _module)
      this._button5 = new Button(control.button5, _module)
      this._button6 = new Button(control.button6, _module)
      this._up = new Button(control.up, _module)
      this._right = new Button(control.right, _module)
      this._down = new Button(control.down, _module)
      this._left = new Button(control.left, _module)
    }

    public get start(): Button {
      return this._start
    }

    public get coin(): Button {
      return this._coin
    }

    public get button1(): Button {
      return this._button1
    }

    public get button2(): Button {
      return this._button2
    }

    public get button3(): Button {
      return this._button3
    }

    public get button4(): Button {
      return this._button4
    }

    public get button5(): Button {
      return this._button5
    }

    public get button6(): Button {
      return this._button6
    }

    public get up(): Button {
      return this._up
    }

    public get right(): Button {
      return this._right
    }

    public get down(): Button {
      return this._down
    }

    public get left(): Button {
      return this._left
    }
  }
}
