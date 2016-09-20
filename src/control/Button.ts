/// <reference path="../model/IModule.ts" />
/// <reference path="SDL_SCANCODE.ts" />

namespace mamejs.control {
  export class Button implements IButton {

    constructor(private scancode: number, private handler: IModule_SDL_SendKeyboardKey) {}

    public press(): void {
      this.handler(BUTTON_PRESS, this.scancode)
    }

    public release(): void {
      this.handler(BUTTON_RELEASE, this.scancode)
    }

    public pressAndRelease(delay: number = 20, callback?: Function): void {
      this.press()
      setTimeout(() => this.release(), delay)
    }
  }
}
