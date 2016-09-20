/// <reference path="SDL_SCANCODE.ts" />
/// <reference path="../model/IControl.ts" />

/**
 * Copied from http://easyemu.mameworld.info/mameguide/mameguide-controls.html
 * -----------------------------  Main Keys -------------------------------------------------
 *
 * 5,6,7,8                  Insert coin
 * 1,2,3,4                  Players 1 - 4 start buttons
 * 9,0,-,=                  Insert service coin (Only Works In Service Mode)
 * F1                       Enables crosshairs. Repeat to add more crosshairs.
 * F2                       Test/Service Switch
 * F3                       Game Reset
 * Left Shift + F3          Game Hard Reset
 * F4                       Show the game graphics. Use cursor keys to change the set or colour.
 * F6                       Enable / Disable Cheat if cheats are enabled.
 * F7                       Load a saved game state from a slot number.
 * Left Shift + F7          Save game state to 1 of 10 slots.
 * F8                       Decrease frame skip during a game.
 * F9                       Increase frame skip during a game.
 * F10                      Speed Throttle (Makes game overspeed)
 * F11                      Frames Per Second and Frameskip information
 * Left Shift + F11         Enables the profiler in debug versions.
 * F12                      Saves image of game screen to snaps directory.
 * Left Shift + F12         Save movie
 * P                        Pause the game
 * Shift + P                Skip one frame forward if paused.
 * Esc                      Exit from game
 * "~" or "¬" (Above Tab)   Volume Control
 * Insert                   Runs game at full throttle and full frameskip.
 * Tab                      Access Mame's in-game menu
 *
 *  -----------------------------  Control Keys (Default) --------------------------------------
 *
 * Arrow Keys               Controller (Player 1)
 * Left Ctrl                Fire 1 (Player 1)
 * Left Alt                 Fire 2 (Player 1)
 * Space                    Fire 3 (Player 1)
 * Left Shift               Fire 4 (Player 1)
 * Z                        Fire 5 (Player 1)
 * X                        Fire 6(Player 1)
 * R,F,G,D                  Controller (Player 2)
 * A                        Fire 1 (Player 2)
 * S                        Fire 2 (Player 2)
 * Q                        Fire 3 (Player 2)
 * W                        Fire 4 (Player 2)
 * Not Set By Default       Fire 5 (Player 2)
 * Not Set By Default       Fire 6 (Player 2)
 * Backspace                Bill 1
 * T                        Tilt
 * -                        Volume Down
 * =                        Volume Up
 *
 * ------------------------------- Mega Tech Additional Keys ---------------------------------------
 *
 * Left Shift               Player 1 Start
 * W                        Player 2 Start
 * 9                        Reset
 * 0                        Select
 * -                        Enter
 *
 * -------------------------------- Playchoice 10 Additional Keys --------------------------------
 *
 * 5                        Adds Time
 * 0                        Select Game
 * 1                        Toggles 1 or 2 Player Mode
 * 2                        Start Game
 */

namespace mamejs.control {
  export var INSERT_COIN1: number = SDL_SCANCODE_5
  export var INSERT_COIN2: number = SDL_SCANCODE_6
  export var INSERT_COIN3: number = SDL_SCANCODE_7
  export var INSERT_COIN4: number = SDL_SCANCODE_8

  export var PLAYER1_START: number = SDL_SCANCODE_1
  export var PLAYER2_START: number = SDL_SCANCODE_2
  export var PLAYER3_START: number = SDL_SCANCODE_3
  export var PLAYER4_START: number = SDL_SCANCODE_4

  export var PAUSE: number = SDL_SCANCODE_P

  export var PLAYER1_UP: number = SDL_SCANCODE_UP
  export var PLAYER1_RIGHT: number = SDL_SCANCODE_RIGHT
  export var PLAYER1_DOWN: number = SDL_SCANCODE_DOWN
  export var PLAYER1_LEFT: number = SDL_SCANCODE_LEFT

  export var PLAYER1_BUTTON1: number = SDL_SCANCODE_LCTRL
  export var PLAYER1_BUTTON2: number = SDL_SCANCODE_LALT
  export var PLAYER1_BUTTON3: number = SDL_SCANCODE_SPACE
  export var PLAYER1_BUTTON4: number = SDL_SCANCODE_LSHIFT
  export var PLAYER1_BUTTON5: number = SDL_SCANCODE_Z
  export var PLAYER1_BUTTON6: number = SDL_SCANCODE_X

  // @TODO
  export var PLAYER2_UP: number = SDL_SCANCODE_UP
  export var PLAYER2_RIGHT: number = SDL_SCANCODE_RIGHT
  export var PLAYER2_DOWN: number = SDL_SCANCODE_DOWN
  export var PLAYER2_LEFT: number = SDL_SCANCODE_LEFT

  export var PLAYER2_BUTTON1: number = SDL_SCANCODE_LCTRL
  export var PLAYER2_BUTTON2: number = SDL_SCANCODE_LALT
  export var PLAYER2_BUTTON3: number = SDL_SCANCODE_SPACE
  export var PLAYER2_BUTTON4: number = SDL_SCANCODE_LSHIFT
  export var PLAYER2_BUTTON5: number = SDL_SCANCODE_Z
  export var PLAYER2_BUTTON6: number = SDL_SCANCODE_X

  export var player1Controller: IControlMapping = {
    start: PLAYER1_START,
    coin: INSERT_COIN1,
    up: PLAYER1_UP,
    right: PLAYER1_RIGHT,
    down: PLAYER1_DOWN,
    left: PLAYER1_LEFT,
    button1: PLAYER1_BUTTON1,
    button2: PLAYER1_BUTTON2,
    button3: PLAYER1_BUTTON3,
    button4: PLAYER1_BUTTON4,
    button5: PLAYER1_BUTTON5,
    button6: PLAYER1_BUTTON6,
  }

  export var player2Controller: IControlMapping = {
    start: PLAYER1_START,
    coin: INSERT_COIN2,
    up: PLAYER1_UP,
    right: PLAYER2_RIGHT,
    down: PLAYER2_DOWN,
    left: PLAYER1_LEFT,
    button1: PLAYER2_BUTTON1,
    button2: PLAYER2_BUTTON2,
    button3: PLAYER2_BUTTON3,
    button4: PLAYER2_BUTTON4,
    button5: PLAYER2_BUTTON5,
    button6: PLAYER2_BUTTON6,
  }
}
