
namespace emloader {
  export class Keyboard {
    static KEYMAPPINGCHANGE: string = 'keymappingchange'

    public keyhandler: IControlKeyHandler

    private keyboardEventHandler: {(evt: KeyboardEvent): void}

    private keyCodeMapping: Array<number> = []


    public setKeyHandler(keyhandler: IControlKeyHandler): void {
      this.keyhandler = keyhandler
    }

    public bind() {
      this.unbind()

      this.keyboardEventHandler = (evt: KeyboardEvent): void => {
        let keyCode = this.keyCodeMapping[evt.keyCode] || evt.keyCode
        if (keyCode) {
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
        this.keyboardEventHandler = null
      }
    }
  }
}
