/// <reference path="../../emloader/helper/KeyCode.ts" />

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
  export class MameKey {
    static INSERT_COIN1: string = 'digit5'
    static INSERT_COIN2: string = 'digit6'
    static INSERT_COIN3: string = 'digit7'
    static INSERT_COIN4: string = 'digit8'

    static PLAYER1_START: string = 'digit1'
    static PLAYER2_START: string = 'digit2'
    static PLAYER3_START: string = 'digit3'
    static PLAYER4_START: string = 'digit4'

    static PLAYER1_UP: string = 'uparrow'
    static PLAYER1_RIGHT: string = 'rightarrow'
    static PLAYER1_DOWN: string = 'downarrow'
    static PLAYER1_LEFT: string = 'leftarrow'

    static PLAYER1_BUTTON1: string = 'ctrl'
    static PLAYER1_BUTTON2: string = 'alt'
    static PLAYER1_BUTTON3: string = 'space'
    static PLAYER1_BUTTON4: string = 'shift'
    static PLAYER1_BUTTON5: string = 'z'
    static PLAYER1_BUTTON6: string = 'x'

    static PLAYER2_UP: string = 'r'
    static PLAYER2_RIGHT: string = 'g'
    static PLAYER2_DOWN: string = 'f'
    static PLAYER2_LEFT: string = 'd'

    static PLAYER2_BUTTON1: string = 'a'
    static PLAYER2_BUTTON2: string = 's'
    static PLAYER2_BUTTON3: string = 'q'
    static PLAYER2_BUTTON4: string = 'w'
    static PLAYER2_BUTTON5: string = 'z'
    static PLAYER2_BUTTON6: string = 'x'

    static ENABLE_CROSSHAIRS: string = 'f1'
    static TEST_SERVICE_SWITCH: string = 'f2'
    static GAME_RESET: string = 'f3'
    static GAME_HARD_RESET: string = 'shift + f3'
    static SHOW_GAME_GRAPHICS: string = 'f4'
    static ENABLE_DISABLE_CHEAT: string = 'f6'
    static LOAD_SAVE_GAME: string = 'f7'
    static SAVE_GAME: string = 'shift + f7'
    static DECREASE_FRAME_SKIP: string = 'f8'
    static INCREASE_FRAME_SKIP: string = 'f9'
    static SPEED_THROTTLE: string = 'f10'
    static SHOW_FPS: string = 'f11'
    static ENABLES_PROFILER: string = 'shift + f11'
    static SAVE_SNAP: string = 'f12'
    static PAUSE: string = 'p'
    static SKIP_ONE_FRAME_FORWARD: string = 'shift + p'
    static EXIT_FROM_GAME: string = 'esc'
    static VOLUME_UP: string = '~'
    static VOLUME_DOWN: string = '¬'
    static RUN_FULL_THROTTLE: string = 'insert'
  }
}
