/// <reference path="../../emloader/model/IModule.ts" />
/// <reference path="../../emloader/helper/EmscriptenHelper.ts" />

namespace mamejs.control {
  export class Button implements IButton {

    constructor(private key: string, private keyboard: Keyboard) {}

    public press(): void {
      this.keyboard.pressKey(this.key)
    }

    public release(): void {
      this.keyboard.releaseKey(this.key)

    }

    public pressAndRelease(): void {
      this.press()
      this.release()
    }
  }
}
