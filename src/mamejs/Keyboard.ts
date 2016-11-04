/// <reference path="../emloader/Keyboard.ts" />
/// <reference path="helper/StringHelper.ts" />
/// <reference path="MameKey.ts" />
/// <reference path="MameKeyHandler.ts" />

namespace mamejs {
  export class Keyboard {
    static KEYMAPPINGCHANGE: string = 'keymappingchange'

    static getDefaultKeyMapping(): {[mameKey: string]: number} {
       let mapping: {[mameKey: string]: number} = {}
       for (var mameKey in MameKey) {
        if (typeof MameKey[mameKey] === 'number') {
          mapping[mameKey] = MameKey[mameKey]
        }
      }
      return mapping
    }

    public keyMapping: {[mameKey: string]: number}
    public keyMappingKey: Array<string>

    public keyhandler: IMameKeyHandler

    private keyboardEventHandler: {(evt: KeyboardEvent): void}

    constructor() {
      this.setKeyMapping(Keyboard.getDefaultKeyMapping())
    }

    public setKeyHandler(keyhandler: IMameKeyHandler): void {
      this.keyhandler = keyhandler
    }

    public getMameKey(keyCode: number): string {
      return this.keyMappingKey[keyCode]
    }

    public getKeyCode(mameKey: string): number {
      return this.keyMapping[mameKey]
    }

    public getKeyName(mameKeyOrKeyCode: string|number): string {
      let keyCode: number = typeof mameKeyOrKeyCode === 'string' ? this.getKeyCode(mameKeyOrKeyCode) : mameKeyOrKeyCode
      return emloader.helper.KeyCodeKey[keyCode]
    }

    public setKeyMapping(keyMapping) {
      this.keyMappingKey = new Array(222)

      for (let mameKey in this.keyMapping) {
        this.keyMapping[mameKey] = keyMapping[mameKey] || this.keyMapping[mameKey]
        this.keyMappingKey[this.keyMapping[mameKey]] = mameKey
      }
    }

    public bind() {
      this.unbind()

      this.keyboardEventHandler = (evt: KeyboardEvent): void => {
        // handle only MameKey
        let mameKey = this.getMameKey(evt.keyCode)
        if (mameKey) {
          evt.type === 'keydown' ? this.keyhandler.pressMameKey(mameKey) : this.keyhandler.releaseMameKey(mameKey)
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
