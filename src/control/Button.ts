/// <reference path="../model/IModule.ts" />
/// <reference path="../constant/SDL.ts" />

namespace mamejs.control {
  export class Button {

    constructor(private scancode: number, private handler: IModule_SDL_SendKeyboardKey) {

    }

    public press(): void {
      this.handler(constant.SDL.BUTTON_PRESS, this.scancode)
    }

    public release(): void {
      this.handler(constant.SDL.BUTTON_RELEASE, this.scancode)
    }

    public pressAndRelease(delay: number = 20, callback?: Function): void {
      this.press()
      setTimeout(() => this.release(), delay)
    }
  }
}
