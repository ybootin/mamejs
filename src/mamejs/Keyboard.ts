/// <reference path="../emloader/Keyboard.ts" />
/// <reference path="helper/StringHelper.ts" />

namespace mamejs {
  export class Keyboard {
    static KEYMAPPINGCHANGE: string = 'keymappingchange'

    // static getDefaultKeyMapping(): {[mameKey: string]: number} {
    //    let mapping: {[mameKey: string]: number} = {}
    //    for (var mameKey in MameKey) {
    //     if (typeof MameKey[mameKey] === 'number') {
    //       mapping[mameKey] = MameKey[mameKey]
    //     }
    //   }
    //   return mapping
    // }

    public keyMapping: {[key: string]: number}
    public keyMappingKey: Array<string> = []

    public keyhandler: IControlKeyHandler

    private keyboardEventHandler: {(evt: KeyboardEvent): void}

    constructor() {
      // default mapping, keyboard is not remap
      this.setKeyMapping(emloader.helper.KeyCode)
    }

    public setKeyHandler(keyhandler: IControlKeyHandler): void {
      this.keyhandler = keyhandler
    }

    public getKeyCode(key: string): number {
      return this.keyMapping[key]
    }

    public getKeyName(keyCode: number): string {
      return this.keyMappingKey[keyCode]
    }

    public setKeyMapping(keyMapping) {
      this.keyMapping = keyMapping

      for (let key in keyMapping) {
        this.keyMappingKey[keyMapping[key]] = key
      }
    }

    public bind() {
      this.unbind()

      this.keyboardEventHandler = (evt: KeyboardEvent): void => {
        let key = this.getKeyName(evt.keyCode)
        if (key) {
          let keyCode = this.getKeyCode(key)
          evt.type === 'keydown' ? this.keyhandler.pressKey(keyCode) : this.keyhandler.releaseKey(keyCode)
        }
      }

      document.addEventListener('keyup', this.keyboardEventHandler)
      document.addEventListener('keydown', this.keyboardEventHandler)
    }

    public unbind() {
      if (this.keyboardEventHandler) {
        document.removeEventListener('keyup', this.keyboardEventHandler)
        document.removeEventListener('keydown', this.keyboardEventHandler)
      }
    }
  }
}
