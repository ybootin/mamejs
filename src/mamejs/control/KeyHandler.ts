/// <reference path="../../emloader/Keyboard.ts" />
/// <reference path="MameKey.ts" />

namespace mamejs.control {
  export class KeyHandler extends emloader.event.EventEmiter {
    // map same key event
    static KEYPRESS: string = emloader.Keyboard.KEYPRESS
    static KEYRELEASE: string = emloader.Keyboard.KEYRELEASE

    static getMameKey(keyCode: number): string {
      let key = emloader.Keyboard.getKey(keyCode)

      for (var keyName in MameKey) {
        if (MameKey[keyName] === key) {
          return keyName
        }
      }
    }

    private keyboardEventHandler: {(evt: KeyboardEvent): void}

    constructor(private loader: emloader.IEmloader) {
      super()

      // need to desactivate all keys handler, to listen only to mame keys
      this.loader.keyboard.unbindKeys()
      this.bindKeys()
    }

    public pressMameKey(key: string): void {
      this.loader.keyboard.pressKey(MameKey[key])
      this.emit(emloader.Keyboard.KEYPRESS, key)
    }

    public releaseMameKey(key: string): void {
      this.loader.keyboard.releaseKey(MameKey[key])
      this.emit(emloader.Keyboard.KEYRELEASE, key)
    }

    public pressAndReleaseMameKey(key: string): void {
      this.pressMameKey(MameKey[key])
      this.releaseMameKey(MameKey[key])
    }

    public bindKeys() {
      // prevent parse all keys each time to get the mapping
      let MameKeyMapping = {}
      Object.keys(MameKey).forEach((keyName: string): void => {
        MameKeyMapping[emloader.Keyboard.getKeyCode(MameKey[keyName])] = keyName
      })

      // handle only MameKey
      this.keyboardEventHandler = (evt: KeyboardEvent): void => {
        let mameKey = MameKeyMapping[evt.keyCode]
        if (mameKey) {
          evt.type === 'keydown' ? this.pressMameKey(MameKeyMapping[evt.keyCode]) : this.releaseMameKey(MameKeyMapping[evt.keyCode])
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
}
