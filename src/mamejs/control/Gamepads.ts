namespace mamejs.control {
  export class Gamepads {
    private gamepads: Array<Gamepad>

    constructor() {
      window.addEventListener("gamepadconnected", (evt: GamepadEvent) => this.onGamepadConnected(evt))
      window.addEventListener("gamepaddisconnected", (evt: GamepadEvent) => this.onGamepadConnected(evt))

      let gamepads = navigator.getGamepads()
      for (var i = 0, l = gamepads.length; i < l; i++) {
        this.connectGamepad(gamepads[i])
      }
    }

    public connectGamepad(gamepad: Gamepad) {
      //this.gamepads.push(gamepad)
      console.log('connectGamepad', gamepad)
    }

    public disconnectGamepad(gamepad: Gamepad) {
      //this.gamepads.push(gamepad)
      console.log('diconnectGamepad', gamepad)
    }

    private onGamepadConnected(evt: GamepadEvent): void {
      console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
          evt.gamepad.index, evt.gamepad.id,
          evt.gamepad.buttons.length, evt.gamepad.axes.length);
      this.connectGamepad(evt.gamepad)
    }

    private onGamepadDisconnected(evt: GamepadEvent): void {
      console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
          evt.gamepad.index, evt.gamepad.id,
          evt.gamepad.buttons.length, evt.gamepad.axes.length);
      this.disconnectGamepad(evt.gamepad)
    }
  }
}
