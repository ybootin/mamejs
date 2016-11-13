/// <reference path="model/IModule.ts" />
/// <reference path="event/EventEmiter.ts" />
/// <reference path="helper/KeyCode.ts" />
/// <reference path="Emloader.ts" />

namespace emloader {
  export class Keyboard extends event.EventEmiter {
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
      Keyboard.triggerKeyEvent(this.module, 'keydown', keyCode, 0)
      this.emit(Keyboard.KEYPRESS, keyCode)
    }

    public releaseKey(keyCode: number): void {
      Keyboard.triggerKeyEvent(this.module, 'keyup', keyCode, 0)
      this.emit(Keyboard.KEYRELEASE, keyCode)
    }
  }

  export class FakeKeyHandler extends event.EventEmiter {
    public pressKey(keyCode: string): void {
      this.emit(Keyboard.KEYPRESS, keyCode)
    }
    public releaseKey(keyCode: string): void {
      this.emit(Keyboard.KEYRELEASE, keyCode)
    }
  }
}
