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
      for (var key in helper.KeyCode) {
        if (helper.KeyCode[key] === keyCode) {
          return key
        }
      }
    }

    static triggerKeyEvent(module: IModule, eventType: string, keyCode: number, charCode: number) {
      return Emloader.triggerEvent(module, eventType, {
        keyCode: keyCode,
        witch: keyCode,
        charCode: charCode
      })
    }

    private _keyboardEventHandler: {(evt: KeyboardEvent): void}

    constructor(private module: IModule) {
      super()

      ;['keyup', 'keydown'].forEach((evtName: string): void => {
        this.module.canvas.addEventListener(evtName, (evt: KeyboardEvent) => {
          this.emit(evtName === 'keydown' ? Keyboard.KEYPRESS : Keyboard.KEYRELEASE, Keyboard.getKey(evt.keyCode))
        })
      })

      // by default, we bind all keys
      this.bindKeys()
    }

    public pressKey(key: string|number): void {
      Keyboard.triggerKeyEvent(this.module, 'keydown', (typeof key === 'string' ? Keyboard.getKeyCode(key) : key), 0)
    }

    public releaseKey(key: string|number): void {
      Keyboard.triggerKeyEvent(this.module, 'keyup', (typeof key === 'string' ? Keyboard.getKeyCode(key) : key), 0)
    }

    public pressAndReleaseKey(key: string|number): void {
      this.pressKey(key)
      this.releaseKey(key)
    }

    public bindKeys(): void {
      this.unbindKeys()

      this._keyboardEventHandler = (evt: KeyboardEvent): void => {
        evt.type === 'keydown' ? this.pressKey(evt.keyCode) : this.releaseKey(evt.keyCode)
      }

      // Must be attached to the main scope, in order to redispatch them to the emScope
      document.addEventListener('keyup', this._keyboardEventHandler)
      document.addEventListener('keydown', this._keyboardEventHandler)
    }

    public unbindKeys(): void {
      if (this._keyboardEventHandler) {
        document.removeEventListener('keyup', this._keyboardEventHandler)
        document.removeEventListener('keydown', this._keyboardEventHandler)
        this._keyboardEventHandler = null
      }
    }
  }
}
