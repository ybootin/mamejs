/// <reference path="../model/IControls.ts" />
/// <reference path="./MameKeyCode.ts" />

namespace mamejs.control {
  export var player1Controller: IControlMapping = {
    start: MameKeyCode.PLAYER1_START,
    coin: MameKeyCode.INSERT_COIN1,
    up: MameKeyCode.PLAYER1_UP,
    right: MameKeyCode.PLAYER1_RIGHT,
    down: MameKeyCode.PLAYER1_DOWN,
    left: MameKeyCode.PLAYER1_LEFT,
    button1: MameKeyCode.PLAYER1_BUTTON1,
    button2: MameKeyCode.PLAYER1_BUTTON2,
    button3: MameKeyCode.PLAYER1_BUTTON3,
    button4: MameKeyCode.PLAYER1_BUTTON4,
    button5: MameKeyCode.PLAYER1_BUTTON5,
    button6: MameKeyCode.PLAYER1_BUTTON6,
  }

  export var player2Controller: IControlMapping = {
    start: MameKeyCode.PLAYER1_START,
    coin: MameKeyCode.INSERT_COIN2,
    up: MameKeyCode.PLAYER1_UP,
    right: MameKeyCode.PLAYER2_RIGHT,
    down: MameKeyCode.PLAYER2_DOWN,
    left: MameKeyCode.PLAYER1_LEFT,
    button1: MameKeyCode.PLAYER2_BUTTON1,
    button2: MameKeyCode.PLAYER2_BUTTON2,
    button3: MameKeyCode.PLAYER2_BUTTON3,
    button4: MameKeyCode.PLAYER2_BUTTON4,
    button5: MameKeyCode.PLAYER2_BUTTON5,
    button6: MameKeyCode.PLAYER2_BUTTON6,
  }
}
