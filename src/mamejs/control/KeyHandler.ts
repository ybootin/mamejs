/// <reference path="../../emloader/Keyboard.ts" />
/// <reference path="MameKey.ts" />

namespace mamejs.control {
  export class KeyHandler extends emloader.event.EventEmiter {
    // map same key event
    static KEYPRESS: string = emloader.Keyboard.KEYPRESS
    static KEYRELEASE: string = emloader.Keyboard.KEYRELEASE

    static COOKIENAME: string = 'mamejskeymapping'

    static keyMapping = DefaultKeyMapping
    static keyMappingKey = DefaultKeyMappingKey

    static getMameKey(keyCode: number): string {
      return KeyHandler.keyMappingKey[keyCode]
    }

    static getKeyCode(mameKey: string): number {
      return KeyHandler.keyMapping[mameKey]
    }

    static getKeyName(mameKeyOrKeyCode: string|number): string {
      let keyCode: number = typeof mameKeyOrKeyCode === 'string' ? KeyHandler.getKeyCode(mameKeyOrKeyCode) : mameKeyOrKeyCode
      return emloader.helper.KeyCodeKey[keyCode]
    }

    static setKeyMapping(keyMapping, save: boolean = true) {
      KeyHandler.keyMappingKey = []
      for (let mameKey in KeyHandler.keyMapping) {
        KeyHandler.keyMapping[mameKey] = keyMapping[mameKey] || KeyHandler.keyMapping[mameKey]
        KeyHandler.keyMappingKey[KeyHandler.keyMapping[mameKey]] = mameKey
      }
      if (save) {
        // set cookie for 10 years !, should be enought
        let expire = new Date(String(new Date().getFullYear() + 10)).toUTCString()
        document.cookie = KeyHandler.COOKIENAME + '=' +  encodeURIComponent(JSON.stringify(keyMapping)) + ';expires=' + expire
      }
    }

    private keyboardEventHandler: {(evt: KeyboardEvent): void}

    constructor(private loader: emloader.IEmloader) {
      super()

      // need to desactivate all keys handler in emloader, to listen only to mame keys
      // this is the key for rebinds key from main frame to emloader frame
      this.loader.keyboard.unbindKeys()
      this.bindKeys()
    }

    public pressMameKey(key: string): void {
      // handle simple key and multiple key combination
      (typeof MameKey[key] === 'number' ? [MameKey[key]] : MameKey[key]).forEach((mameKey: string) => {
        this.loader.keyboard.pressKey(mameKey)
      })

      this.emit(emloader.Keyboard.KEYPRESS, key)
    }

    public releaseMameKey(key: string): void {
      // handle simple key and multiple key combination
      (typeof MameKey[key] === 'number' ? [MameKey[key]] : MameKey[key]).forEach((mameKey: string) => {
        this.loader.keyboard.releaseKey(mameKey)
      })

      this.emit(emloader.Keyboard.KEYRELEASE, key)
    }

    public pressAndReleaseMameKey(key: string): void {
      this.pressMameKey(MameKey[key])
      this.releaseMameKey(MameKey[key])
    }

    public setKeyMapping(keyMapping) {
      KeyHandler.setKeyMapping(keyMapping)
      this.unbindKeys()
      this.bindKeys()
    }

    public bindKeys() {
      this.keyboardEventHandler = (evt: KeyboardEvent): void => {
        // handle only MameKey
        let mameKey = KeyHandler.getMameKey(evt.keyCode)
        if (mameKey) {
          evt.type === 'keydown' ? this.pressMameKey(mameKey) : this.releaseMameKey(mameKey)
        }
      }

      document.addEventListener('keyup', this.keyboardEventHandler)
      document.addEventListener('keydown', this.keyboardEventHandler)
    }

    public unbindKeys() {
      if (this.keyboardEventHandler) {
        document.addEventListener('keyup', this.keyboardEventHandler)
        document.addEventListener('keydown', this.keyboardEventHandler)

        this.keyboardEventHandler = null
      }
    }
  }

  try {
    // check for cookie, to inject saved keyMapping !
    let cookie: string = document.cookie.replace(new RegExp('/(?:(?:^|.*;\s*)' + KeyHandler.COOKIENAME + '\s*\=\s*([^;]*).*$)|^.*$/'), "$1")
    KeyHandler.setKeyMapping(JSON.parse(decodeURIComponent(cookie)), false)
  } catch(e) {}
}
