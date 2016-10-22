/// <reference path="../../emloader/model/IModule.ts" />
/// <reference path="../model/IControls.ts" />
/// <reference path="../../emloader/model/IEmloader.ts" />
/// <reference path="MAMEControllers.ts" />
/// <reference path="Arcade6Buttons.ts" />
/// <reference path="Button.ts" />

namespace mamejs.control {
  export class Controls implements IControls {

    private _player1: IControl
    private _player2: IControl

    constructor(private _mame: Mame) {
      this._player1 = new Arcade6Buttons(player1Controller, this._mame.loader.module)
      this._player2 = new Arcade6Buttons(player1Controller, this._mame.loader.module)

      this.handleGamepads()
    }

    public get player1(): IControl {
      return this._player1
    }

    public get player2(): IControl {
      return this._player2
    }

    public triggerKey(keyCode: number): void {
      (new Button(keyCode, this._mame.loader.module)).pressAndRelease()
    }

    private handleGamepads(): void {
      let connectGamepad = (gamepad: Gamepad): void => {
        let pressed = {}
        let axes = [['left', 'right'], ['up', 'down']]
        let keyMap = ['button1', 'button2', 'button3', 'button4', 'button5', 'button6', null, null, 'coin', 'start']

        let loop = () => {
          let gmp = navigator.getGamepads()[gamepad.index]
          let keyPress = (key : string) => {
            pressed[key] = true
            this._mame.loader.simulateKeyEvent('keydown', this.player1[key].press())
          }
          let keyRelease = (key: string) => {
            pressed[key] = false
            this._mame.loader.simulateKeyEvent('keyup', this.player1[key].release())
          }

          // handles axis press / release
          axes.forEach((axe: Array<string>, index: number): void => {
            try {
              if (gmp.axes[index] === -1 || gmp.axes[index] === 1) {
                keyPress(gmp.axes[index] === -1 ? axe[0] : axe[1])
              } else if (pressed[axe[0]] || pressed[axe[1]]) {
                keyRelease(pressed[axe[0]] ? axe[0] : axe[1])
              }
             } catch (e) {} // prevent exception when disconnect
          })

          // handle key press/release
          keyMap.forEach((bt: string, index: number): void => {
            if (bt) {
              try {
                if (gmp.buttons[index].pressed) {
                  keyPress(bt)
                } else if (pressed[bt]) {
                  keyRelease(bt)
                }
              } catch (e) {} // prevent exception when disconnect
            }
          })

          requestAnimationFrame(loop)
        }
        loop()
        console.log('connectGamepad', gamepad)
      }

      let disconnectGamepad = (gamepad: Gamepad): void => {
        console.log('diconnectGamepad', gamepad)
      }

      window.addEventListener("gamepadconnected", (evt: GamepadEvent) => connectGamepad(evt.gamepad))
      window.addEventListener("gamepaddisconnected", (evt: GamepadEvent) => disconnectGamepad(evt.gamepad))

      let gamepads = navigator.getGamepads()
      for (var i = 0, l = gamepads.length; i < l; i++) {
        if (gamepads[i]) {
          connectGamepad(gamepads[i])
        }
      }
    }
  }
}
