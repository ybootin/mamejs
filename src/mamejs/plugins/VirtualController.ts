/// <reference path="../model/IJoystick.ts" />
/// <reference path="../mamejs.ts" />
/// <reference path="MameButton.ts" />
/// <reference path="ControlSelector.ts" />

namespace mamejs.plugins {
  export class VirtualController {
    public joystick: Joystick
    public buttons: {[mameKey: string]: MameButton} = {}
    public keyHandler: IMameKeyHandler

    private mainContainer: HTMLElement
    private selector: ControlSelector

    private mameKeyButtonsMapping: {[mameKey: string]: string} = {}

    constructor(public mapping: IControlMapping) {
      this.mainContainer = document.createElement('div')

      this.setJoystick(mamejs.controllers.getJoystick(mapping))

      for (var controllerButton in mapping) {
        let mameKey: string = mapping[controllerButton]
        let button = new MameButton(mameKey)
        this.buttons[mameKey] = button

        this.mainContainer.appendChild(button.getElement())

        this.mameKeyButtonsMapping[mameKey] = controllerButton
      }

      this.selector = new ControlSelector(mapping, (joystick?: Joystick): void => {
        this.setJoystick(joystick)
      })

      this.mainContainer.appendChild(this.selector.getElement())

      this.updateButtons()

      // Handle keychange visually
      mamejs.controllers.on(mamejs.Controllers.MAMEKEYPRESS, (mameKey: string) => this.onKeyEvent(mamejs.Controllers.MAMEKEYPRESS, mameKey))
      mamejs.controllers.on(mamejs.Controllers.MAMEKEYRELEASE, (mameKey: string) => this.onKeyEvent(mamejs.Controllers.MAMEKEYRELEASE, mameKey))
    }

    public getElement(): HTMLElement {
      return this.mainContainer
    }

    public setKeyHandler(keyHandler: IMameKeyHandler) {
      this.keyHandler = keyHandler
    }

    public getKeyHandler(): IMameKeyHandler {
      return this.keyHandler
    }

    public setJoystick(joystick?: Joystick): void {
      this.joystick = joystick
      this.updateButtons()
    }

    public updateButtons() {
      for (var mameKey in this.buttons) {
        this.updateButton(this.buttons[mameKey], this.mameKeyButtonsMapping[mameKey])
      }
    }

    public updateButton(button: MameButton, buttonId: string): void {
      let keyName = mamejs.controllers.keyboard.getKeyName(button.mameKey)
      let classes = ['game-button', 'game-button-' + keyName, 'game-button-' + buttonId]

      if (!!this.joystick) {
        classes.push('game-button-gamepad')
      }

      button.getElement().className = classes.join(' ')
      console.log('buttonId', buttonId)
      switch (buttonId) {
        case 'coin':
        case 'start':
          // this is just a hack to have 1, 2, 3 ... instead of digit1, digit2 ... when use game pad
          button.setValue(buttonId.replace('coin', 'insert coin') + ' (' + keyName.replace('digit', '') + ')')
          break
        default:
          button.setValue(!!this.joystick ? buttonId.replace('button', '') : keyName)
      }
    }

    private onKeyEvent(eventName: string, mameKey: string) {
      if (this.buttons[mameKey]) {
        // Lazy button.addClass/removeClass(className)
        this.buttons[mameKey][(eventName === mamejs.Controllers.MAMEKEYPRESS ? 'add' : 'remove') + 'Class']('game-button-pressed')
      }
    }
  }
}
