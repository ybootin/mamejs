/// <reference path="../../emloader/model/IModule.ts" />
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

    constructor(control: IControlMapping, _keyboard: Keyboard) {
      this._start = new Button(control.start, _keyboard)
      this._coin = new Button(control.coin, _keyboard)
      this._button1 = new Button(control.button1, _keyboard)
      this._button2 = new Button(control.button2, _keyboard)
      this._button3 = new Button(control.button3, _keyboard)
      this._button4 = new Button(control.button4, _keyboard)
      this._button5 = new Button(control.button5, _keyboard)
      this._button6 = new Button(control.button6, _keyboard)
      this._up = new Button(control.up, _keyboard)
      this._right = new Button(control.right, _keyboard)
      this._down = new Button(control.down, _keyboard)
      this._left = new Button(control.left, _keyboard)
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
