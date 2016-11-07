/// <reference path="model/IControls.ts" />
/// <reference path="MameKeyHandler.ts" />
/// <reference path="model/IMameKeyHandler.ts" />
/// <reference path="model/IJoystick.ts" />

namespace mamejs {
  export class Joystick extends emloader.event.EventEmiter implements IJoystick {
    static axes = [['left', 'right'], ['up', 'down']]

    // maps IControl keys as string like this control[button]
    static buttonMap = ['button1', 'button2', 'button3', 'button4', 'button5', 'button6', null, null, 'coin', 'start']

    static BUTTONMAPCHANGE: string = 'buttonmapchange'
    static DISCONNECTED: string = 'disconnected'
    static CONNECTED: string = 'connected'
    static CONTROLCHANGE: string = 'controlchange'

    private pressed = {}
    private loopId: number

    private sensibility: number = 0.5

    private customButtonMap: Array<string>

    private handler: IMameKeyHandler

    private gamepad: Gamepad

    private controlMapping: IControlMapping

    public setControlMapping(controlMapping: IControlMapping) {
      if (this.controlMapping !== controlMapping) {
        this.controlMapping = controlMapping
        this.emit(Joystick.CONTROLCHANGE)
      }
    }

    public getControlMapping(): IControlMapping {
      return this.controlMapping
    }

    public setKeyHandler(handler: IMameKeyHandler) {
      this.handler = handler
    }

    public getKeyHandler(): IMameKeyHandler {
      return this.handler
    }

    public connect(gamepad: Gamepad) {
      if (!this.isConnected()) {
        this.gamepad = gamepad

        this.emit(Joystick.CONNECTED)

        let loop = () => {
          let gamepad = this.getGamepad()

          // handles axis press / release
          Joystick.axes.forEach((axe: Array<string>, index: number): void => {
            try {
              if (gamepad.axes[index] <= -this.sensibility || gamepad.axes[index] >= this.sensibility) {
                this.keyPress(gamepad.axes[index] <= -this.sensibility ? axe[0] : axe[1])
              } else if (this.pressed[axe[0]] || this.pressed[axe[1]]) {
                this.keyRelease(this.pressed[axe[0]] ? axe[0] : axe[1])
              }
            } catch (e) {} // prevent exception when disconnect
          })

          // handle key press/release
          this.getButtonMap().forEach((bt: string, index: number): void => {
            if (bt) {
              try {
                if (gamepad.buttons[index].pressed) {
                  this.keyPress(bt)
                } else if (this.pressed[bt]) {
                  this.keyRelease(bt)
                }
              } catch (e) {} // prevent exception when disconnect
            }
          })

          this.loopId = requestAnimationFrame(loop)
        }

        loop()
      }
    }

    public disconnect() {
      cancelAnimationFrame(this.loopId)
      this.loopId = null
      this.gamepad = null
      this.controlMapping = null
      this.emit(Joystick.DISCONNECTED)
    }

    public isConnected(): boolean {
      return !!this.loopId
    }

    public getGamepad(): Gamepad {
      return this.gamepad ? navigator.getGamepads()[this.gamepad.index] : null
    }

    public getButtonMap(): Array<string> {
      return this.customButtonMap || Joystick.buttonMap
    }

    public setButtonMap(buttonMap: Array<string>) {
      if (buttonMap !== this.customButtonMap) {
        this.customButtonMap = buttonMap
        this.emit(Joystick.BUTTONMAPCHANGE)
      }
    }

    private keyPress(key: string) {
      if (this.handler) {
        this.pressed[key] = true
        this.handler.pressMameKey(this.controlMapping[key])
      }
    }

    private keyRelease(key: string) {
      if (this.handler) {
        this.pressed[key] = false
        this.handler.releaseMameKey(this.controlMapping[key])
      }
    }
  }
}
