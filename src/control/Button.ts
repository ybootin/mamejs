/// <reference path="../model/IModule.ts" />
/// <reference path="SDL_SCANCODE.ts" />

namespace mamejs.control {
  export class Button implements IButton {

    private _pressed: boolean = false
    private _rafId

    constructor(private scancode: number, private handler: IModule_SDL_SendKeyboardKey) {}

    public get pressed(): boolean {
      return this._pressed
    }

    public press(): void {
      this._pressed = true
      this._rafId = raf(() => this.handler(BUTTON_PRESS, this.scancode))
    }

    public release(): void {
      craf(this._rafId)
      this.handler(BUTTON_RELEASE, this.scancode)
    }

    public pressAndRelease(callback?: Function): void {
      this.press()
      raf(() => {
        this.release()
        if (typeof callback === 'function') {
          try {
            callback()
          } catch(e) {}
        }
      })
    }
  }
}
