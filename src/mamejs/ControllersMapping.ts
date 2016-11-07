/// <reference path="model/IControls.ts" />

namespace mamejs {
  export class ControllersMapping {
    static player1: IControlMapping = {
      start: 'START1',
      coin: 'COIN1',
      up: 'P1_JOYSTICK_UP',
      right: 'P1_JOYSTICK_RIGHT',
      down: 'P1_JOYSTICK_DOWN',
      left: 'P1_JOYSTICK_LEFT',
      button1: 'P1_BUTTON1',
      button2: 'P1_BUTTON2',
      button3: 'P1_BUTTON3',
      button4: 'P1_BUTTON4',
      button5: 'P1_BUTTON5',
      button6: 'P1_BUTTON6',
    }

    static player2: IControlMapping = {
      start: 'START2',
      coin: 'COIN2',
      up: 'P2_JOYSTICK_UP',
      right: 'P2_JOYSTICK_RIGHT',
      down: 'P2_JOYSTICK_DOWN',
      left: 'P2_JOYSTICK_LEFT',
      button1: 'P2_BUTTON1',
      button2: 'P2_BUTTON2',
      button3: 'P2_BUTTON3',
      button4: 'P2_BUTTON4',
      button5: 'P2_BUTTON5',
      button6: 'P2_BUTTON6',
    }
  }
}
