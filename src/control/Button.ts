/// <reference path="../model/IModule.ts" />
/// <reference path="SDL_SCANCODE.ts" />

namespace mamejs.control {
  export class Button implements IButton {

    private _pressed: boolean = false

    constructor(private scancode: number, private handler: IModule_SDL_SendKeyboardKey) {}

    public get pressed(): boolean {
      return this._pressed
    }

    public press(callback?: Function): void {
      this._pressed = true
      this.handler(BUTTON_PRESS, this.scancode)

      if (typeof callback === 'function') {
        requestAnimationFrame(() => callback())
      }
    }

    public release(): void {
      this.handler(BUTTON_RELEASE, this.scancode)
      this._pressed = false
    }

    public pressAndRelease(callback?: Function): void {
      this.press(() => this.release())
    }
  }
}
