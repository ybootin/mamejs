namespace mamejs {
  export class ControllerButton {
    constructor(controller, controlName) {
      let button = document.createElement('button')

      button.addEventListener('mousedown', (evt: MouseEvent) => this.keyHandler.pressKey(mameKey))
      button.addEventListener('mouseup',(evt: MouseEvent) => this.keyHandler.releaseKey(mameKey))
    }
  }
}
