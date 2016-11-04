namespace mamejs {
  export class ControlSelector {
    private mainContainer: HTMLElement
    private joystick: Joystick

    constructor(private mapping: IControlMapping) {
      this.mainContainer = document.createElement('div')

      this.setJoystick(mamejs.getJoystick(mapping))

      mamejs.on('joystickconnected', (joystick) => {
        if (joystick.getControlMapping() === mapping) {
          this.setJoystick(mapping)
        }
      })

      mamejs.on('joystickdisconnected', (joystick) => {
        if (joystick.getControlMapping() === mapping) {
          this.setJoystick(null)
        }
      })

      mamejs.on('joystickmappingchange', (joystick) => {
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

    public setJoystick(joystick: Joystick = null) {
      if (!this.isOpened && joystick === this.joystick) {
        return
      }

      this.empty()

      if (joystick !== this.joystick) {
        this.joystick = joystick
        this.joystick.setControlMapping(this.mapping)
      }

      this.mainContainer.appendChild(this.createSelectedOption(this.joystick))
    }

    public open(): void {
      if (this.isOpened()) {
        return
      }

      let addOptionClick = (joystick: Joystick = null) => {
        let option = this.createOption(joystick)
        option.addEventListener('click', (evt: MouseEvent) => {
          this.setJoystick(joystick)
        })
      }

      // add keyboard option if joystick is selected
      if (this.joystick) {
        addOptionClick()
      }

      mamejs.getJoysticks().forEach((joystick: Joystick) => {
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
      return this.container.childNodes.length > 1
    }

    private empty(): void {
      while (this.mainContainer.hasChildNodes()) {
        this.mainContainer.removeChild(this.mainContainer.lastChild);
      }
    }

    private createSelectedOption(joystick: Joystick = null): HTMLElement {
      let option = this.createOption(gamepad)
      option.addEventListener('click', (evt: Event) => {
        this.isClosed ? this.open() : this.close()
      })

      return option
    }

    private createOption(joystick: Joystick = null): HTMLElement {
      let option = document.createElement('div')
      option.className = 'mamejs-joystick-selector ' + (joystick ? 'icon-gamepad' : 'icon-keyboard')
      option.dataset.controlId = joystick ? 'joystick' + joystick.gamepad.index : 'keyboard'
      option.innerHTML = joystick ? joystick.gamepad.index + 1 : ''

      return option
    }
  }
}
