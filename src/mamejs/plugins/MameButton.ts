/// <reference path="../model/IMameKeyHandler.ts" />
/// <reference path="../mamejs.ts" />

namespace mamejs.plugins {
  export class MameButton {
    private element: HTMLElement

    constructor(public mameKey) {
      this.element = document.createElement('button')

      this.element.appendChild(document.createElement('span'))

      this.element.addEventListener('mousedown', (evt: MouseEvent) => mamejs.controllers.getKeyHandler().pressMameKey(mameKey))
      this.element.addEventListener('mouseup',(evt: MouseEvent) => mamejs.controllers.getKeyHandler().releaseMameKey(mameKey))
    }

    public getElement(): HTMLElement {
      return this.element
    }

    public setValue(name: string): void {
      this.element.getElementsByTagName('span')[0].innerHTML = name
    }

    public addClass(className: string): void {
      this.element.className = this.element.className + (this.element.className.split(' ').indexOf(className) === -1 ? ' ' + className : '')
    }

    public removeClass(className: string): void {
      this.element.className = this.element.className.split(' ').filter((item: string): boolean => {
        return item !== className
      }).join(' ')
    }
  }
}
