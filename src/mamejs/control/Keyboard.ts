/// <reference path="../../emloader/model/IModule.ts" />
/// <reference path="../../emloader/event/EventEmiter.ts" />

namespace mamejs.control {
  export class Keyboard extends emloader.event.EventEmiter {
    static KEYPRESS: string = 'keypress'
    static KEYRELEASE: string = 'keyrelease'

    constructor(private module: emloader.IModule) {
      super()

      ;['keyup', 'keydown'].forEach((evtName: string): void => {
        this.module.canvas.addEventListener(evtName, (evt: KeyboardEvent) => {
          this.emit(evtName === 'keydown' ? Keyboard.KEYPRESS : Keyboard.KEYRELEASE, this.getKey(evt.keyCode))
        })
      })
    }

    public pressKey(key: string): void {
      emloader.helper.EmscriptenHelper.simulateKeyEvent(this.module, 'keydown', this.getKeyCode(key), 0)
    }

    public releaseKey(key: string): void {
      emloader.helper.EmscriptenHelper.simulateKeyEvent(this.module, 'keyup', this.getKeyCode(key), 0)
    }

    public pressAndReleaseKey(key: string): void {
      this.pressKey(key)
      this.releaseKey(key)
    }

    public getKeyCode(key): number {
      return emloader.helper.KeyCode[key]
    }

    public getKey(keyCode: number): string {
      for (var key in emloader.helper.KeyCode) {
        if (emloader.helper.KeyCode[key] === keyCode) {
          return key
        }
      }
    }
  }
}
