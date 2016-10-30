/// <reference path="../../emloader/helper/KeyCode.ts" />

namespace mamejs.control {
  /**
   * Mame keymapping
   *  @see http://easyemu.mameworld.info/mameguide/mameguide-controlini.htm for keys
   */

  export class MameKeyCode {
    static KEYCODE_A: number = emloader.helper.KeyCode.a
    static KEYCODE_B: number = emloader.helper.KeyCode.b
    static KEYCODE_C: number = emloader.helper.KeyCode.c
    static KEYCODE_D: number = emloader.helper.KeyCode.d
    static KEYCODE_E: number = emloader.helper.KeyCode.e
    static KEYCODE_F: number = emloader.helper.KeyCode.f
    static KEYCODE_G: number = emloader.helper.KeyCode.g
    static KEYCODE_H: number = emloader.helper.KeyCode.h
    static KEYCODE_I: number = emloader.helper.KeyCode.i
    static KEYCODE_J: number = emloader.helper.KeyCode.j
    static KEYCODE_K: number = emloader.helper.KeyCode.k
    static KEYCODE_L: number = emloader.helper.KeyCode.l
    static KEYCODE_M: number = emloader.helper.KeyCode.m
    static KEYCODE_N: number = emloader.helper.KeyCode.n
    static KEYCODE_O: number = emloader.helper.KeyCode.o
    static KEYCODE_P: number = emloader.helper.KeyCode.p
    static KEYCODE_Q: number = emloader.helper.KeyCode.q
    static KEYCODE_R: number = emloader.helper.KeyCode.r
    static KEYCODE_S: number = emloader.helper.KeyCode.s
    static KEYCODE_T: number = emloader.helper.KeyCode.t
    static KEYCODE_U: number = emloader.helper.KeyCode.u
    static KEYCODE_V: number = emloader.helper.KeyCode.v
    static KEYCODE_W: number = emloader.helper.KeyCode.w
    static KEYCODE_X: number = emloader.helper.KeyCode.x
    static KEYCODE_Y: number = emloader.helper.KeyCode.y
    static KEYCODE_Z: number = emloader.helper.KeyCode.z
    static KEYCODE_0: number = emloader.helper.KeyCode.digit0
    static KEYCODE_1: number = emloader.helper.KeyCode.digit1
    static KEYCODE_2: number = emloader.helper.KeyCode.digit2
    static KEYCODE_3: number = emloader.helper.KeyCode.digit3
    static KEYCODE_4: number = emloader.helper.KeyCode.digit4
    static KEYCODE_5: number = emloader.helper.KeyCode.digit5
    static KEYCODE_6: number = emloader.helper.KeyCode.digit6
    static KEYCODE_7: number = emloader.helper.KeyCode.digit7
    static KEYCODE_8: number = emloader.helper.KeyCode.digit8
    static KEYCODE_9: number = emloader.helper.KeyCode.digit9
    static KEYCODE_0_PAD: number = emloader.helper.KeyCode.numpad0
    static KEYCODE_1_PAD: number = emloader.helper.KeyCode.numpad1
    static KEYCODE_2_PAD: number = emloader.helper.KeyCode.numpad2
    static KEYCODE_3_PAD: number = emloader.helper.KeyCode.numpad3
    static KEYCODE_4_PAD: number = emloader.helper.KeyCode.numpad4
    static KEYCODE_5_PAD: number = emloader.helper.KeyCode.numpad5
    static KEYCODE_6_PAD: number = emloader.helper.KeyCode.numpad6
    static KEYCODE_7_PAD: number = emloader.helper.KeyCode.numpad7
    static KEYCODE_8_PAD: number = emloader.helper.KeyCode.numpad8
    static KEYCODE_9_PAD: number = emloader.helper.KeyCode.numpad9
    static KEYCODE_F1: number = emloader.helper.KeyCode.f1
    static KEYCODE_F2: number = emloader.helper.KeyCode.f2
    static KEYCODE_F3: number = emloader.helper.KeyCode.f3
    static KEYCODE_F4: number = emloader.helper.KeyCode.f4
    static KEYCODE_F5: number = emloader.helper.KeyCode.f5
    static KEYCODE_F6: number = emloader.helper.KeyCode.f6
    static KEYCODE_F7: number = emloader.helper.KeyCode.f7
    static KEYCODE_F8: number = emloader.helper.KeyCode.f8
    static KEYCODE_F9: number = emloader.helper.KeyCode.f9
    static KEYCODE_F10: number = emloader.helper.KeyCode.f10
    static KEYCODE_F11: number = emloader.helper.KeyCode.f11
    static KEYCODE_F12: number = emloader.helper.KeyCode.f12
    static KEYCODE_MINUS: number = emloader.helper.KeyCode.subtract
    static KEYCODE_TAB: number = emloader.helper.KeyCode.tab
    static KEYCODE_ENTER: number = emloader.helper.KeyCode.enter
    static KEYCODE_BACKSLASH: number = emloader.helper.KeyCode.backslash
    static KEYCODE_STOP: number = 0
    static KEYCODE_INSERT: number = emloader.helper.KeyCode.insert
    static KEYCODE_END: number = emloader.helper.KeyCode.end
    static KEYCODE_LEFT: number = emloader.helper.KeyCode.leftarrow
    static KEYCODE_RIGHT: number = emloader.helper.KeyCode.rightarrow
    static KEYCODE_UP: number = emloader.helper.KeyCode.uparrow
    static KEYCODE_DOWN: number = emloader.helper.KeyCode.downarrow
    static KEYCODE_MINUS_PAD: number = 0
    static KEYCODE_ENTER_PAD: number = 0
    static KEYCODE_LSHIFT: number = emloader.helper.KeyCode.shift
    static KEYCODE_RCONTROL: number = 0
    static KEYCODE_SCRLOCK: number = 0
    static KEYCODE_ESC: number = emloader.helper.KeyCode.escape
    static KEYCODE_EQUALS: number = emloader.helper.KeyCode.equalsign
    static KEYCODE_OPENBRACE : number = 0
    static KEYCODE_COLON: number = 0
    static KEYCODE_BACKSLASH2: number = 0
    static KEYCODE_SLASH: number = 0
    static KEYCODE_DEL: number = emloader.helper.KeyCode.delete
    static KEYCODE_SLASH_PAD: number = 0
    static KEYCODE_PLUS_PAD: number = 0
    static KEYCODE_PRTSCR: number = 0
    static KEYCODE_RSHIFT : number = 0
    static KEYCODE_LALT: number = emloader.helper.KeyCode.alt
    static KEYCODE_NUMLOCK: number = 0
    static KEYCODE_LWIN: number = 0
    static KEYCODE_RWIN: number = 0
    static KEYCODE_TILDE: number = 0
    static KEYCODE_BACKSPACE: number = emloader.helper.KeyCode.backspace
    static KEYCODE_CLOSEBRACE: number = 0
    static KEYCODE_QUOTE: number = emloader.helper.KeyCode.singlequote
    static KEYCODE_COMMA: number = emloader.helper.KeyCode.comma
    static KEYCODE_SPACE: number = emloader.helper.KeyCode.space
    static KEYCODE_HOME: number = emloader.helper.KeyCode.home
    static KEYCODE_PGUP: number = emloader.helper.KeyCode.pageup
    static KEYCODE_PGDN: number = emloader.helper.KeyCode.pageup
    static KEYCODE_ASTERISK: number = emloader.helper.KeyCode.multiply
    static KEYCODE_DEL_PAD: number = 0
    static KEYCODE_PAUSE: number = emloader.helper.KeyCode.pauseBreak
    static KEYCODE_LCONTROL: number = emloader.helper.KeyCode.ctrl
    static KEYCODE_RALT: number = 0
    static KEYCODE_CAPSLOCK: number = emloader.helper.KeyCode.capsLock
    static KEYCODE_MENU    : number = 0
  }

  export class MameKey {
    static COIN1: number = MameKeyCode.KEYCODE_5
    static COIN2: number = MameKeyCode.KEYCODE_6
    static COIN3: number = MameKeyCode.KEYCODE_7
    static COIN4: number = MameKeyCode.KEYCODE_8

    static START1: number = MameKeyCode.KEYCODE_1
    static START2: number = MameKeyCode.KEYCODE_2
    static START3: number = MameKeyCode.KEYCODE_3
    static START4: number = MameKeyCode.KEYCODE_4

    static P1_JOYSTICK_UP: number = MameKeyCode.KEYCODE_UP
    static P1_JOYSTICK_RIGHT: number = MameKeyCode.KEYCODE_RIGHT
    static P1_JOYSTICK_DOWN: number = MameKeyCode.KEYCODE_DOWN
    static P1_JOYSTICK_LEFT: number = MameKeyCode.KEYCODE_LEFT

    static P1_BUTTON1: number = MameKeyCode.KEYCODE_LCONTROL
    static P1_BUTTON2: number = MameKeyCode.KEYCODE_LALT
    static P1_BUTTON3: number = MameKeyCode.KEYCODE_SPACE
    static P1_BUTTON4: number = MameKeyCode.KEYCODE_LSHIFT
    static P1_BUTTON5: number = MameKeyCode.KEYCODE_Z
    static P1_BUTTON6: number = MameKeyCode.KEYCODE_X

    static P2_JOYSTICK_UP: number = MameKeyCode.KEYCODE_R
    static P2_JOYSTICK_RIGHT: number = MameKeyCode.KEYCODE_G
    static P2_JOYSTICK_DOWN: number = MameKeyCode.KEYCODE_F
    static P2_JOYSTICK_LEFT: number = MameKeyCode.KEYCODE_D

    static P2_BUTTON1: number = MameKeyCode.KEYCODE_A
    static P2_BUTTON2: number = MameKeyCode.KEYCODE_S
    static P2_BUTTON3: number = MameKeyCode.KEYCODE_Q
    static P2_BUTTON4: number = MameKeyCode.KEYCODE_W
    static P2_BUTTON5: number = MameKeyCode.KEYCODE_E
    static P2_BUTTON6: number = MameKeyCode.KEYCODE_U

    static UI_CONFIGURE: number = MameKeyCode.KEYCODE_TAB
    static UI_PAUSE: number = MameKeyCode.KEYCODE_P
    static UI_SHOW_FPS: number = MameKeyCode.KEYCODE_F11

    // static ENABLE_CROSSHAIRS: number = emloader.helper.KeyCode.f1
    // static TEST_SERVICE_SWITCH: number = emloader.helper.KeyCode.f2
    // static GAME_RESET: number = emloader.helper.KeyCode.f3
    // static GAME_HARD_RESET: Array<number> = [emloader.helper.KeyCode.shift, emloader.helper.KeyCode.f3]
    // static SHOW_GAME_GRAPHICS: number = emloader.helper.KeyCode.f4
    // static ENABLE_DISABLE_CHEAT: number = emloader.helper.KeyCode.f6
    // static LOAD_SAVE_GAME: number = emloader.helper.KeyCode.f7
    // static SAVE_GAME: Array<number> = [emloader.helper.KeyCode.shift, emloader.helper.KeyCode.f7]
    // static DECREASE_FRAME_SKIP: number = emloader.helper.KeyCode.f8
    // static INCREASE_FRAME_SKIP: number = emloader.helper.KeyCode.f9
    // static SPEED_THROTTLE: number = emloader.helper.KeyCode.f10
    // static ENABLES_PROFILER: Array<number> = [emloader.helper.KeyCode.shift, emloader.helper.KeyCode.f11]
    // static SAVE_SNAP: number = emloader.helper.KeyCode.f12
    // static SKIP_ONE_FRAME_FORWARD: Array<number> = [emloader.helper.KeyCode.shift, emloader.helper.KeyCode.p]
    // static EXIT_FROM_GAME: number = emloader.helper.KeyCode.escape
    // static RUN_FULL_THROTTLE: number = emloader.helper.KeyCode.insert
  }



  export var MameKeyCodeKey = {}
  for (var mameKeyCode in MameKeyCode) {
    if (MameKeyCode[mameKeyCode]) {
      MameKeyCodeKey[MameKeyCode[mameKeyCode]] = mameKeyCode
    }
  }

  // This is the default map for the user keyboard, by default we don't map multiple key touch
  // userkey -> MameKeyMapping <-> MameKey -> Mame
  export var DefaultKeyMapping = {}
  export var DefaultKeyMappingKey = {}
  export var MameKeyMameKeyCode: { [mameKey: string]: string; } = {}
  for (var mameKey in MameKey) {
    if (typeof MameKey[mameKey] === 'number') {
      DefaultKeyMapping[mameKey] = MameKey[mameKey]
      DefaultKeyMappingKey[MameKey[mameKey]] = mameKey

      MameKeyMameKeyCode[mameKey] = MameKeyCodeKey[MameKey[mameKey]]
    }
  }
}
