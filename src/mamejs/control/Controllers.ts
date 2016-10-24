/// <reference path="../model/IControls.ts" />
/// <reference path="MameKey.ts" />

namespace mamejs.control {
  export var player1Controller: IControlMapping = {
    start: MameKey.PLAYER1_START,
    coin: MameKey.INSERT_COIN1,
    up: MameKey.PLAYER1_UP,
    right: MameKey.PLAYER1_RIGHT,
    down: MameKey.PLAYER1_DOWN,
    left: MameKey.PLAYER1_LEFT,
    button1: MameKey.PLAYER1_BUTTON1,
    button2: MameKey.PLAYER1_BUTTON2,
    button3: MameKey.PLAYER1_BUTTON3,
    button4: MameKey.PLAYER1_BUTTON4,
    button5: MameKey.PLAYER1_BUTTON5,
    button6: MameKey.PLAYER1_BUTTON6,
  }

  export var player2Controller: IControlMapping = {
    start: MameKey.PLAYER2_START,
    coin: MameKey.INSERT_COIN2,
    up: MameKey.PLAYER2_UP,
    right: MameKey.PLAYER2_RIGHT,
    down: MameKey.PLAYER2_DOWN,
    left: MameKey.PLAYER2_LEFT,
    button1: MameKey.PLAYER2_BUTTON1,
    button2: MameKey.PLAYER2_BUTTON2,
    button3: MameKey.PLAYER2_BUTTON3,
    button4: MameKey.PLAYER2_BUTTON4,
    button5: MameKey.PLAYER2_BUTTON5,
    button6: MameKey.PLAYER2_BUTTON6,
  }
}
