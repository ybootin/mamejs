namespace mamejs {
  export class VirtualController {
    public joystick: Joystick
    public buttons: Array<HTMLButtonElement> = []
    public keyHandler: KeyHandler
    constructor(public mapping: IControlMapping) {
      this.mainContainer = document.createElement('div')

      this.joystick = mamejs.JoystickHandler.getJoystick(mapping)

      for (var controllerButton in mapping) {
        // let mameKey = mapping[controllerButton]

        // let button = document.createElement('button')

        // button.addEventListener('mousedown', ((mameKey) => {
        //   return (evt: MouseEvent) => this.keyHandler.pressKey(mameKey)
        // })(mameKey))

        // button.addEventListener('mouseup', ((mameKey) => {
        //   return (evt: MouseEvent) => this.keyHandler.releaseKey(mameKey)
        // })(mameKey))

        // this.formatButton(button)

        // // the keyboard keyname , ex : shift, ctrl, space, a ...
        // let keyName = mamejs.KeyHandler.getKeyName(mameKey)

        // formatControlButton(button, mameKey, keyName, !!gamepad)
        // initMameButton(button, mameKey)

        this.buttons.push(new ControllerButton(this, controllerButton))
      }

      this.buttons.forEach((btn: ControllerButton) => mainContainer.appendChild(btn.getElement()))

      this.keyPressHandler = (key: MameKey) => {

      }
    }

    public setKeyHandler(keyHandler: KeyHandler) {
      if (this.getKeyHandler()) {
        this.getKeyHandler().off('keypress', this.keyPressHandler)
        this.getKeyHandler().off('keyrelease', this.keyPressHandler)
      }
      keyHandler.on('keypress', this.keyPressHandler)
      keyHandler.on('keyrelease', this.keyPressHandler)

      this.keyHandler = keyHandler
    }

    public getKeyHandler(): KeyHandler {
      return this.keyHandler
    }



      function formatControlButton(button, controlName, keyName, useGamepad) {
        keyName = keyName || button.dataset.keyName
        controlName = controlName || button.dataset.controlName // coin, start, button1 ...

        button.dataset.keyName = keyName
        button.dataset.controlName = controlName

        let content = button.getElementsByTagName('span')[0]
        if (!content) {
          content = document.createElement('span')
          button.appendChild(content)
        }

        // remove game-button classes, and reput them
        let classes = button.className.split(' ').filter(function(classItem) {
          return classItem.indexOf('game-button') === -1
        })
        classes.push('game-button')
        classes.push('game-button-' + keyName)
        classes.push('game-button-' + controlName)

        if (useGamepad) {
          classes.push('game-button-gamepad')
        }

        button.className = classes.join(' ')

        switch (controlName) {
          case 'coin':
          case 'start':
            // this is just a hack to have 1, 2, 3 ... instead of digit1, digit2 ... when use game pad
            content.innerHTML = controlName.replace('coin', 'insert coin') + ' (' + keyName.replace('digit', '') + ')'
            break
          default:
            content.innerHTML = useGamepad ? controlName.replace('button', '') : keyName
        }
      }
  }
}
