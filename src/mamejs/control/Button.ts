/// <reference path="KeyHandler.ts" />

namespace mamejs.control {
  export class Button implements IButton {

    constructor(private key: string, private handler: KeyHandler) {}

    public press(): void {
      this.handler.pressMameKey(this.key)
    }

    public release(): void {
      this.handler.releaseMameKey(this.key)
    }

    public pressAndRelease(): void {
      this.press()
      this.release()
    }
  }
}
