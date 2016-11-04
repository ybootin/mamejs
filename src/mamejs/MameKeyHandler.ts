/// <reference path="../emloader/Keyboard.ts" />
/// <reference path="helper/StringHelper.ts" />
/// <reference path="helper/Ctrlr.ts" />
/// <reference path="MameKey.ts" />
/// <reference path="model/IMameKeyHandler.ts" />

namespace mamejs {
  export class MameKeyHandler extends emloader.event.EventEmiter implements IMameKeyHandler {
    // map same key event
    static KEYPRESS: string = emloader.Keyboard.KEYPRESS
    static KEYRELEASE: string = emloader.Keyboard.KEYRELEASE

    constructor(private keyHandler: emloader.Keyboard) {
      super()
    }

    public pressMameKey(mameKey: string): void {
      // handle simple key and multiple key combination
      (typeof MameKey[mameKey] === 'number' ? [MameKey[mameKey]] : MameKey[mameKey]).forEach((keyCode: number) => {
        this.keyHandler.pressKey(keyCode)
      })

      this.emit(MameKeyHandler.KEYPRESS, mameKey)
    }

    public releaseMameKey(mameKey: string): void {
      // handle simple key and multiple key combination
      (typeof MameKey[mameKey] === 'number' ? [MameKey[mameKey]] : MameKey[mameKey]).forEach((keyCode: number) => {
        this.keyHandler.releaseKey(keyCode)
      })

      this.emit(MameKeyHandler.KEYRELEASE, mameKey)
    }
  }

  export class FakeKeyHandler extends emloader.event.EventEmiter implements IMameKeyHandler {
    public pressMameKey(mameKey: string): void {
      this.emit(MameKeyHandler.KEYPRESS, mameKey)
    }
    public releaseMameKey(mameKey: string): void {
      this.emit(MameKeyHandler.KEYRELEASE, mameKey)
    }
  }
}
