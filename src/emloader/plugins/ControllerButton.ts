/// <reference path="../model/IControls.ts" />
/// <reference path="../controllers/Controllers.ts" />

namespace emloader.plugins {
  export class ControllerButton {
    private element: HTMLElement

    constructor(public controllers: Controllers, public keyCode) {
      this.element = document.createElement('button')

      this.element.appendChild(document.createElement('span'))

      this.element.addEventListener('mousedown', (evt: MouseEvent) => this.controllers.getKeyHandler().pressKey(keyCode))
      this.element.addEventListener('mouseup',(evt: MouseEvent) => this.controllers.getKeyHandler().releaseKey(keyCode))
    }

    public getElement(): HTMLElement {
      return this.element
    }

    public setValue(name: string): void {
      this.element.getElementsByTagName('span')[0].innerHTML = name
    }
  }
}
