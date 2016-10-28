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
    static INSERT_COIN1: number = emloader.helper.KeyCode.digit5
    static INSERT_COIN2: number = emloader.helper.KeyCode.digit6
    static INSERT_COIN3: number = emloader.helper.KeyCode.digit7
    static INSERT_COIN4: number = emloader.helper.KeyCode.digit8

    static PLAYER1_START: number = emloader.helper.KeyCode.digit1
    static PLAYER2_START: number = emloader.helper.KeyCode.digit2
    static PLAYER3_START: number = emloader.helper.KeyCode.digit3
    static PLAYER4_START: number = emloader.helper.KeyCode.digit4

    static PLAYER1_UP: number = emloader.helper.KeyCode.uparrow
    static PLAYER1_RIGHT: number = emloader.helper.KeyCode.rightarrow
    static PLAYER1_DOWN: number = emloader.helper.KeyCode.downarrow
    static PLAYER1_LEFT: number = emloader.helper.KeyCode.leftarrow

    static PLAYER1_BUTTON1: number = emloader.helper.KeyCode.ctrl
    static PLAYER1_BUTTON2: number = emloader.helper.KeyCode.alt
    static PLAYER1_BUTTON3: number = emloader.helper.KeyCode.space
    static PLAYER1_BUTTON4: number = emloader.helper.KeyCode.shift
    static PLAYER1_BUTTON5: number = emloader.helper.KeyCode.z
    static PLAYER1_BUTTON6: number = emloader.helper.KeyCode.x

    static PLAYER2_UP: number = emloader.helper.KeyCode.r
    static PLAYER2_RIGHT: number = emloader.helper.KeyCode.g
    static PLAYER2_DOWN: number = emloader.helper.KeyCode.f
    static PLAYER2_LEFT: number = emloader.helper.KeyCode.d

    static PLAYER2_BUTTON1: number = emloader.helper.KeyCode.a
    static PLAYER2_BUTTON2: number = emloader.helper.KeyCode.s
    static PLAYER2_BUTTON3: number = emloader.helper.KeyCode.q
    static PLAYER2_BUTTON4: number = emloader.helper.KeyCode.w
    static PLAYER2_BUTTON5: number = emloader.helper.KeyCode.z
    static PLAYER2_BUTTON6: number = emloader.helper.KeyCode.x

    static IN_GAME_MENU: number = emloader.helper.KeyCode.tab
    static ENABLE_CROSSHAIRS: number = emloader.helper.KeyCode.f1
    static TEST_SERVICE_SWITCH: number = emloader.helper.KeyCode.f2
    static GAME_RESET: number = emloader.helper.KeyCode.f3
    static GAME_HARD_RESET: Array<number> = [emloader.helper.KeyCode.shift, emloader.helper.KeyCode.f3]
    static SHOW_GAME_GRAPHICS: number = emloader.helper.KeyCode.f4
    static ENABLE_DISABLE_CHEAT: number = emloader.helper.KeyCode.f6
    static LOAD_SAVE_GAME: number = emloader.helper.KeyCode.f7
    static SAVE_GAME: Array<number> = [emloader.helper.KeyCode.shift, emloader.helper.KeyCode.f7]
    static DECREASE_FRAME_SKIP: number = emloader.helper.KeyCode.f8
    static INCREASE_FRAME_SKIP: number = emloader.helper.KeyCode.f9
    static SPEED_THROTTLE: number = emloader.helper.KeyCode.f10
    static SHOW_FPS: number = emloader.helper.KeyCode.f11
    static ENABLES_PROFILER: Array<number> = [emloader.helper.KeyCode.shift, emloader.helper.KeyCode.f11]
    static SAVE_SNAP: number = emloader.helper.KeyCode.f12
    static PAUSE: number = emloader.helper.KeyCode.p
    static SKIP_ONE_FRAME_FORWARD: Array<number> = [emloader.helper.KeyCode.shift, emloader.helper.KeyCode.p]
    static EXIT_FROM_GAME: number = emloader.helper.KeyCode.escape
    static RUN_FULL_THROTTLE: number = emloader.helper.KeyCode.insert
  }

  // This is the default map for the user keyboard, by default we don't map multiple key touch
  // userkey -> MameKeyMapping <-> MameKey -> Mame
  export var DefaultKeyMapping = {}
  export var DefaultKeyMappingKey = {}
  for (var mameKey in MameKey) {
    if (typeof MameKey[mameKey] === 'number') {
      DefaultKeyMapping[mameKey] = MameKey[mameKey]
      DefaultKeyMappingKey[MameKey[mameKey]] = mameKey
    }

  }
}
