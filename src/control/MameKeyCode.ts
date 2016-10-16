/// <reference path="../helper/KeyCode.ts" />

namespace mamejs.control {
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
  export class MameKeyCode {
    static INSERT_COIN1: number = helper.KeyCode.digit5
    static INSERT_COIN2: number = helper.KeyCode.digit6
    static INSERT_COIN3: number = helper.KeyCode.digit7
    static INSERT_COIN4: number = helper.KeyCode.digit8

    static PLAYER1_START: number = helper.KeyCode.digit1
    static PLAYER2_START: number = helper.KeyCode.digit2
    static PLAYER3_START: number = helper.KeyCode.digit3
    static PLAYER4_START: number = helper.KeyCode.digit4

    static PAUSE: number = helper.KeyCode.p

    static PLAYER1_UP: number = helper.KeyCode.uparrow
    static PLAYER1_RIGHT: number = helper.KeyCode.rightarrow
    static PLAYER1_DOWN: number = helper.KeyCode.downarrow
    static PLAYER1_LEFT: number = helper.KeyCode.leftarrow

    static PLAYER1_BUTTON1: number = helper.KeyCode.ctrl
    static PLAYER1_BUTTON2: number = helper.KeyCode.alt
    static PLAYER1_BUTTON3: number = helper.KeyCode.space
    static PLAYER1_BUTTON4: number = helper.KeyCode.shift
    static PLAYER1_BUTTON5: number = helper.KeyCode.z
    static PLAYER1_BUTTON6: number = helper.KeyCode.x

  // @TODO
    static PLAYER2_UP: number = helper.KeyCode.uparrow
    static PLAYER2_RIGHT: number = helper.KeyCode.rightarrow
    static PLAYER2_DOWN: number = helper.KeyCode.downarrow
    static PLAYER2_LEFT: number = helper.KeyCode.leftarrow

    static PLAYER2_BUTTON1: number = helper.KeyCode.ctrl
    static PLAYER2_BUTTON2: number = helper.KeyCode.alt
    static PLAYER2_BUTTON3: number = helper.KeyCode.space
    static PLAYER2_BUTTON4: number = helper.KeyCode.shift
    static PLAYER2_BUTTON5: number = helper.KeyCode.z
    static PLAYER2_BUTTON6: number = helper.KeyCode.x

  }
}
