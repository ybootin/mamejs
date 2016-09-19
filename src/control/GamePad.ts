/// <reference path="../model/Window.ts" />

namespace mamejs.control {

  export class GamePad {
    private raf: any
    private xAxis
    private yAxis

    constructor(private gamepad: Gamepad, private joystick: Arcade6Buttons) {

    }

    public connect() {
      this.raf = raf(() => {
        //check axes :
        let xAxis = this.gamepad.axes[0]
        let yAxis = this.gamepad.axes[1]

        if (xAxis === 1) {
          this.joystick.right.release()
          this.joystick.left.press()
        } else if (xAxis === -1) {
          this.joystick.left.release()
          this.joystick.right.press()
        } else {
          this.joystick.left.release()
          this.joystick.left.press()
        }

        if (yAxis === 1) {
          this.joystick.down.release()
          this.joystick.up.press()
        } else if (yAxis === -1) {
          this.joystick.up.release()
          this.joystick.down.press()
        } else {
          this.joystick.up.release()
          this.joystick.down.release()
        }

      })
    }

    public disconnect() {
      craf(this.raf)
    }
  }
}
