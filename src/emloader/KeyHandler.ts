/// <reference path="model/IModule.ts" />
/// <reference path="model/IControls.ts" />
/// <reference path="event/EventEmiter.ts" />
/// <reference path="helper/KeyCode.ts" />
/// <reference path="Emloader.ts" />

namespace emloader {
  export class KeyHandler extends event.EventEmiter implements IControlKeyHandler {
    static KEYPRESS: string = 'keypress'
    static KEYRELEASE: string = 'keyrelease'

    static getKeyCode(key): number {
      return helper.KeyCode[key]
    }

    static getKey(keyCode: number): string {
      return helper.KeyCodeKey[keyCode]
    }

    static triggerKeyEvent(module: IModule, eventType: string, keyCode: number, charCode: number) {
      return Emloader.triggerEvent(module, eventType, {
        keyCode: keyCode,
        witch: keyCode,
        charCode: charCode
      })
    }

    constructor(private module: IModule) {
      super()
    }

    public pressKey(keyCode: number): void {
      KeyHandler.triggerKeyEvent(this.module, 'keydown', keyCode, 0)
      this.emit(KeyHandler.KEYPRESS, keyCode)
    }

    public releaseKey(keyCode: number): void {
      KeyHandler.triggerKeyEvent(this.module, 'keyup', keyCode, 0)
      this.emit(KeyHandler.KEYRELEASE, keyCode)
    }
  }

  export class FakeKeyHandler extends event.EventEmiter {
    public pressKey(keyCode: string): void {
      this.emit(KeyHandler.KEYPRESS, keyCode)
    }
    public releaseKey(keyCode: string): void {
      this.emit(KeyHandler.KEYRELEASE, keyCode)
    }
  }
}
