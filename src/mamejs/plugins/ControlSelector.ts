/// <reference path="../model/IJoystick.ts" />
/// <reference path="../mamejs.ts" />

namespace mamejs.plugins {

  export class ControlSelector {
    private mainContainer: HTMLElement
    private joystick: IJoystick

    constructor(private mapping: IControlMapping, private onChange: {(joystick?: IJoystick): void}) {
      this.mainContainer = document.createElement('div')

      this.setJoystick(mamejs.controllers.getJoystick(mapping))

      mamejs.controllers.on(Controllers.JOYSTICKCONNECTED, (joystick: IJoystick) => {
        if (joystick.getControlMapping() === mapping) {
          this.setJoystick(joystick)
        }
      })

      mamejs.controllers.on(Controllers.JOYSTICKDISCONNECTED, (joystick: IJoystick) => {
        if (joystick.getControlMapping() === mapping) {
          this.setJoystick(null)
        }
      })

      mamejs.controllers.on(Controllers.JOYSTICKCONTROLCHANGE, (joystick: IJoystick) => {
        if (joystick === this.joystick && joystick.getControlMapping() !== mapping) {
          this.setJoystick(null)
        } else if (joystick !== this.joystick && joystick.getControlMapping() === mapping) {
          this.setJoystick(joystick)
        }
      })
    }

    public getElement(): HTMLElement {
      return this.mainContainer
    }

    public setJoystick(joystick: IJoystick = null) {
      if (!this.isOpened && joystick === this.joystick) {
        return
      }

      this.empty()

      if (joystick !== this.joystick) {
        this.joystick = joystick
        if (joystick) {
          this.joystick.setControlMapping(this.mapping)
        }
      }

      this.mainContainer.appendChild(this.createSelectedOption(this.joystick))
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
      }

      // add keyboard option if joystick is selected
      if (this.joystick) {
        addOptionClick()
      }

      mamejs.controllers.getJoysticks().forEach((joystick: IJoystick) => {
        if (joystick && joystick !== this.joystick) {
          addOptionClick(joystick)
        }
      })
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

    private createSelectedOption(joystick: IJoystick = null): HTMLElement {
      let option = this.createOption(joystick)
      option.addEventListener('click', (evt: Event) => {
        this.isOpened() ? this.close() : this.open()
      })

      return option
    }

    private createOption(joystick: IJoystick = null): HTMLElement {
      let option = document.createElement('div')
      option.className = 'mamejs-joystick-selector ' + (joystick ? 'icon-gamepad' : 'icon-keyboard')
      option.innerHTML = joystick ? String(joystick.getGamepad().index + 1) : ''

      return option
    }
  }
}
