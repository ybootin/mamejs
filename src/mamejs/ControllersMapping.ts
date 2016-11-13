/// <reference path="model/IControls.ts" />

namespace mamejs {
  export class ControllersMapping {
    static player1 = {
      start: MameKey.START1,
      coin: MameKey.COIN1,
      up: MameKey.P1_JOYSTICK_UP,
      right: MameKey.P1_JOYSTICK_RIGHT,
      down: MameKey.P1_JOYSTICK_DOWN,
      left: MameKey.P1_JOYSTICK_LEFT,
      button1: MameKey.P1_BUTTON1,
      button2: MameKey.P1_BUTTON2,
      button3: MameKey.P1_BUTTON3,
      button4: MameKey.P1_BUTTON4,
      button5: MameKey.P1_BUTTON5,
      button6: MameKey.P1_BUTTON6,
    }

    static player2 = {
      start: MameKey.START2,
      coin: MameKey.COIN2,
      up: MameKey.P2_JOYSTICK_UP,
      right: MameKey.P2_JOYSTICK_RIGHT,
      down: MameKey.P2_JOYSTICK_DOWN,
      left: MameKey.P2_JOYSTICK_LEFT,
      button1: MameKey.P2_BUTTON1,
      button2: MameKey.P2_BUTTON2,
      button3: MameKey.P2_BUTTON3,
      button4: MameKey.P2_BUTTON4,
      button5: MameKey.P2_BUTTON5,
      button6: MameKey.P2_BUTTON6,
    }
  }
}
