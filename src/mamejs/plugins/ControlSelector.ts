/// <reference path="../model/IJoystick.ts" />
/// <reference path="../mamejs.ts" />
/// <reference path="../helper/HTMLHelper.ts" />

namespace mamejs.plugins {

  export class ControlSelector {
    private mainContainer: HTMLElement
    private joystick: IJoystick

    private baseClass: string = 'mamejs-control-selector'

    constructor(private mapping: IControlMapping, private onChange?: {(joystick?: IJoystick): void}) {
      this.mainContainer = document.createElement('div')
      this.mainContainer.className = this.baseClass

      this.setJoystick(mamejs.controllers.getJoystick(mapping))

      mamejs.controllers.on(Controllers.JOYSTICKCONNECTED, (joystick: IJoystick) => {
        this.setJoystick(joystick.getControlMapping() === mapping ? joystick : this.joystick)
      })

      mamejs.controllers.on(Controllers.JOYSTICKDISCONNECTED, (joystick: IJoystick) => {
        this.setJoystick(this.joystick && !this.joystick.isConnected() ? null : this.joystick)
      })

      mamejs.controllers.on(Controllers.JOYSTICKCONTROLCHANGE, (joystick: IJoystick) => {
        if (joystick === this.joystick && joystick.getControlMapping() !== mapping) {
          this.setJoystick(null)
        } else if (joystick !== this.joystick && joystick.getControlMapping() === mapping) {
          this.setJoystick(joystick)
        } else {
          this.setJoystick(this.joystick)
        }
      })
    }

    public getElement(): HTMLElement {
      return this.mainContainer
    }

    public setJoystick(joystick: IJoystick = null) {
      if (joystick !== this.joystick && joystick && joystick.getControlMapping() !== this.mapping) {
        joystick.setControlMapping(this.mapping) // will trigger mappingchnage event and update everything
      }

      this.joystick = joystick

      // refresh UI
      this.empty()
      this.mainContainer.appendChild(this.createOption(this.joystick, true))

      if (typeof this.onChange === 'function') {
        this.onChange(joystick)
      }
    }

    public open(): void {
      if (this.isOpened()) {
        return
      }

      let addOptionClick = (joystick: IJoystick = null) => {
        let option = this.createOption(joystick)
        option.addEventListener('click', (evt: MouseEvent) => {
          this.setJoystick(joystick)
        })

        this.mainContainer.appendChild(option)
      }

      mamejs.controllers.getJoysticks().forEach((joystick: IJoystick) => {
        if (joystick && joystick !== this.joystick) {
          addOptionClick(joystick)
        }
      })

      // add keyboard option if joystick is selected
      // keep keyboard always at the end of the list
      if (this.joystick) {
        addOptionClick()
      }

      helper.HTMLHelper.addClass(<HTMLElement>this.mainContainer.childNodes[0], this.baseClass + '-expanded')
    }

    public close() {
      this.setJoystick(this.joystick)
    }

    // check if not already opened
    private isOpened(): boolean {
      return this.mainContainer.childNodes.length > 1
    }

    private empty(): void {
      while (this.mainContainer.hasChildNodes()) {
        this.mainContainer.removeChild(this.mainContainer.lastChild);
      }
    }

    private createOption(joystick: IJoystick = null, main?: boolean): HTMLElement {
      let option = document.createElement('div')
      option.className = this.baseClass + '-item ' + this.baseClass + '-' + (joystick ? 'gamepad' : 'keyboard')
      option.innerHTML = joystick && joystick.getGamepad() ? String(joystick.getGamepad().index + 1) : ''

      if (main && mamejs.controllers.getJoysticks().length > 0) {
        helper.HTMLHelper.addClass(option, this.baseClass + '-expandable')
        option.addEventListener('click', (evt: Event) => {
          this.isOpened() ? this.close() : this.open()
        })
      }

      return option
    }
  }
}
