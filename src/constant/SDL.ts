namespace mamejs.constant {
  /**
   * port scancodes from
   *
   *  https://www.libsdl.org/tmp/SDL/include/SDL_scancode.h
   *
   *  also, look at this :
   *     https://wiki.libsdl.org/SDL_Keycode?highlight=%28%5CbCategoryEnum%5Cb%29%7C%28CategoryKeyboard%29
   */
  export class SDL {
    // custom
    static BUTTON_PRESS: number = 0
    static BUTTON_RELEASE: number = 1
/*
  Simple DirectMedia Layer
  Copyright (C) 1997-2016 Sam Lantinga <slouken@libsdl.org>

  This software is provided 'as-is', without any express or implied
  warranty.  In no event will the authors be held liable for any damages
  arising from the use of this software.

  Permission is granted to anyone to use this software for any purpose,
  including commercial applications, and to alter it and redistribute it
  freely, subject to the following restrictions:

  1. The origin of this software must not be misrepresented; you must not
     claim that you wrote the original software. If you use this software
     in a product, an acknowledgment in the product documentation would be
     appreciated but is not required.
  2. Altered source versions must be plainly marked as such, and must not be
     misrepresented as being the original software.
  3. This notice may not be removed or altered from any source distribution.
*/


/**
 *  \brief The SDL keyboard scancode representation.
 *
 *  Values of this type are used to represent keyboard keys, among other places
 *  in the \link SDL_Keysym::scancode key.keysym.scancode \endlink field of the
 *  SDL_Event structure.
 *
 *  The values in this enumeration are based on the USB usage page standard:
 *  http://www.usb.org/developers/devclass_docs/Hut1_12v2.pdf
 */

    static SDL_SCANCODE_UNKNOWN: number = 0

    /**
     *  \name Usage page 0x07
     *
     *  These values are from usage page 0x07 (USB keyboard page).
     */
    /* @{ */

    static SDL_SCANCODE_A: number = 4
    static SDL_SCANCODE_B: number = 5
    static SDL_SCANCODE_C: number = 6
    static SDL_SCANCODE_D: number = 7
    static SDL_SCANCODE_E: number = 8
    static SDL_SCANCODE_F: number = 9
    static SDL_SCANCODE_G: number = 10
    static SDL_SCANCODE_H: number = 11
    static SDL_SCANCODE_I: number = 12
    static SDL_SCANCODE_J: number = 13
    static SDL_SCANCODE_K: number = 14
    static SDL_SCANCODE_L: number = 15
    static SDL_SCANCODE_M: number = 16
    static SDL_SCANCODE_N: number = 17
    static SDL_SCANCODE_O: number = 18
    static SDL_SCANCODE_P: number = 19
    static SDL_SCANCODE_Q: number = 20
    static SDL_SCANCODE_R: number = 21
    static SDL_SCANCODE_S: number = 22
    static SDL_SCANCODE_T: number = 23
    static SDL_SCANCODE_U: number = 24
    static SDL_SCANCODE_V: number = 25
    static SDL_SCANCODE_W: number = 26
    static SDL_SCANCODE_X: number = 27
    static SDL_SCANCODE_Y: number = 28
    static SDL_SCANCODE_Z: number = 29

    static SDL_SCANCODE_1: number = 30
    static SDL_SCANCODE_2: number = 31
    static SDL_SCANCODE_3: number = 32
    static SDL_SCANCODE_4: number = 33
    static SDL_SCANCODE_5: number = 34
    static SDL_SCANCODE_6: number = 35
    static SDL_SCANCODE_7: number = 36
    static SDL_SCANCODE_8: number = 37
    static SDL_SCANCODE_9: number = 38
    static SDL_SCANCODE_0: number = 39

    static SDL_SCANCODE_RETURN: number = 40
    static SDL_SCANCODE_ESCAPE: number = 41
    static SDL_SCANCODE_BACKSPACE: number = 42
    static SDL_SCANCODE_TAB: number = 43
    static SDL_SCANCODE_SPACE: number = 44

    static SDL_SCANCODE_MINUS: number = 45
    static SDL_SCANCODE_EQUALS: number = 46
    static SDL_SCANCODE_LEFTBRACKET: number = 47
    static SDL_SCANCODE_RIGHTBRACKET: number = 48
    static SDL_SCANCODE_BACKSLASH: number = 49 /**< Located at the lower left of the return
                                  *   key on ISO keyboards and at the right end
                                  *   of the QWERTY row on ANSI keyboards.
                                  *   Produces REVERSE SOLIDUS (backslash) and
                                  *   VERTICAL LINE in a US layout, REVERSE
                                  *   SOLIDUS and VERTICAL LINE in a UK Mac
                                  *   layout, NUMBER SIGN and TILDE in a UK
                                  *   Windows layout, DOLLAR SIGN and POUND SIGN
                                  *   in a Swiss German layout, NUMBER SIGN and
                                  *   APOSTROPHE in a German layout, GRAVE
                                  *   ACCENT and POUND SIGN in a French Mac
                                  *   layout, and ASTERISK and MICRO SIGN in a
                                  *   French Windows layout.
                                  */
    static SDL_SCANCODE_NONUSHASH: number = 50 /**< ISO USB keyboards actually use this code
                                  *   instead of 49 for the same key, but all
                                  *   OSes I've seen treat the two codes
                                  *   identically. So, as an implementor, unless
                                  *   your keyboard generates both of those
                                  *   codes and your OS treats them differently,
                                  *   you should generate static SDL_SCANCODE_BACKSLASH: number
                                  *  instead of this code. As a user, you
                                  *   should not rely on this code because SDL
                                  *   will never generate it with most (all?)
                                  *   keyboards.
                                  */
    static SDL_SCANCODE_SEMICOLON: number = 51
    static SDL_SCANCODE_APOSTROPHE: number = 52
    static SDL_SCANCODE_GRAVE: number = 53 /**< Located in the top left corner (on both ANSI
                              *   and ISO keyboards). Produces GRAVE ACCENT and
                              *   TILDE in a US Windows layout and in US and UK
                              *   Mac layouts on ANSI keyboards, GRAVE ACCENT
                              *   and NOT SIGN in a UK Windows layout, SECTION
                              *   SIGN and PLUS-MINUS SIGN in US and UK Mac
                              *   layouts on ISO keyboards, SECTION SIGN and
                              *   DEGREE SIGN in a Swiss German layout (Mac:
                              *   only on ISO keyboards), CIRCUMFLEX ACCENT and
                              *   DEGREE SIGN in a German layout (Mac: only on
                              *   ISO keyboards), SUPERSCRIPT TWO and TILDE in a
                              *   French Windows layout, COMMERCIAL AT and
                              *   NUMBER SIGN in a French Mac layout on ISO
                              *   keyboards, and LESS-THAN SIGN and GREATER-THAN
                              *   SIGN in a Swiss German, German, or French Mac
                              *   layout on ANSI keyboards.
                              */
    static SDL_SCANCODE_COMMA: number = 54
    static SDL_SCANCODE_PERIOD: number = 55
    static SDL_SCANCODE_SLASH: number = 56

    static SDL_SCANCODE_CAPSLOCK: number = 57

    static SDL_SCANCODE_F1: number = 58
    static SDL_SCANCODE_F2: number = 59
    static SDL_SCANCODE_F3: number = 60
    static SDL_SCANCODE_F4: number = 61
    static SDL_SCANCODE_F5: number = 62
    static SDL_SCANCODE_F6: number = 63
    static SDL_SCANCODE_F7: number = 64
    static SDL_SCANCODE_F8: number = 65
    static SDL_SCANCODE_F9: number = 66
    static SDL_SCANCODE_F10: number = 67
    static SDL_SCANCODE_F11: number = 68
    static SDL_SCANCODE_F12: number = 69

    static SDL_SCANCODE_PRINTSCREEN: number = 70
    static SDL_SCANCODE_SCROLLLOCK: number = 71
    static SDL_SCANCODE_PAUSE: number = 72
    static SDL_SCANCODE_INSERT: number = 73 /**< insert on PC, help on some Mac keyboards (but
                                   does send code 73, not 117) */
    static SDL_SCANCODE_HOME: number = 74
    static SDL_SCANCODE_PAGEUP: number = 75
    static SDL_SCANCODE_DELETE: number = 76
    static SDL_SCANCODE_END: number = 77
    static SDL_SCANCODE_PAGEDOWN: number = 78
    static SDL_SCANCODE_RIGHT: number = 79
    static SDL_SCANCODE_LEFT: number = 80
    static SDL_SCANCODE_DOWN: number = 81
    static SDL_SCANCODE_UP: number = 82

    static SDL_SCANCODE_NUMLOCKCLEAR: number = 83 /**< num lock on PC, clear on Mac keyboards
                                     */
    static SDL_SCANCODE_KP_DIVIDE: number = 84
    static SDL_SCANCODE_KP_MULTIPLY: number = 85
    static SDL_SCANCODE_KP_MINUS: number = 86
    static SDL_SCANCODE_KP_PLUS: number = 87
    static SDL_SCANCODE_KP_ENTER: number = 88
    static SDL_SCANCODE_KP_1: number = 89
    static SDL_SCANCODE_KP_2: number = 90
    static SDL_SCANCODE_KP_3: number = 91
    static SDL_SCANCODE_KP_4: number = 92
    static SDL_SCANCODE_KP_5: number = 93
    static SDL_SCANCODE_KP_6: number = 94
    static SDL_SCANCODE_KP_7: number = 95
    static SDL_SCANCODE_KP_8: number = 96
    static SDL_SCANCODE_KP_9: number = 97
    static SDL_SCANCODE_KP_0: number = 98
    static SDL_SCANCODE_KP_PERIOD: number = 99

    static SDL_SCANCODE_NONUSBACKSLASH: number = 100 /**< This is the additional key that ISO
                                        *   keyboards have over ANSI ones,
                                        *   located between left shift and Y.
                                        *   Produces GRAVE ACCENT and TILDE in a
                                        *   US or UK Mac layout, REVERSE SOLIDUS
                                        *   (backslash) and VERTICAL LINE in a
                                        *   US or UK Windows layout, and
                                        *   LESS-THAN SIGN and GREATER-THAN SIGN
                                        *   in a Swiss German, German, or French
                                        *   layout. */
    static SDL_SCANCODE_APPLICATION: number = 101 /**< windows contextual menu, compose */
    static SDL_SCANCODE_POWER: number = 102 /**< The USB document says this is a status flag,
                               *   not a physical key - but some Mac keyboards
                               *   do have a power key. */
    static SDL_SCANCODE_KP_EQUALS: number = 103
    static SDL_SCANCODE_F13: number = 104
    static SDL_SCANCODE_F14: number = 105
    static SDL_SCANCODE_F15: number = 106
    static SDL_SCANCODE_F16: number = 107
    static SDL_SCANCODE_F17: number = 108
    static SDL_SCANCODE_F18: number = 109
    static SDL_SCANCODE_F19: number = 110
    static SDL_SCANCODE_F20: number = 111
    static SDL_SCANCODE_F21: number = 112
    static SDL_SCANCODE_F22: number = 113
    static SDL_SCANCODE_F23: number = 114
    static SDL_SCANCODE_F24: number = 115
    static SDL_SCANCODE_EXECUTE: number = 116
    static SDL_SCANCODE_HELP: number = 117
    static SDL_SCANCODE_MENU: number = 118
    static SDL_SCANCODE_SELECT: number = 119
    static SDL_SCANCODE_STOP: number = 120
    static SDL_SCANCODE_AGAIN: number = 121   /**< redo */
    static SDL_SCANCODE_UNDO: number = 122
    static SDL_SCANCODE_CUT: number = 123
    static SDL_SCANCODE_COPY: number = 124
    static SDL_SCANCODE_PASTE: number = 125
    static SDL_SCANCODE_FIND: number = 126
    static SDL_SCANCODE_MUTE: number = 127
    static SDL_SCANCODE_VOLUMEUP: number = 128
    static SDL_SCANCODE_VOLUMEDOWN: number = 129
/* not sure whether there's a reason to enable these */
/*     static SDL_SCANCODE_LOCKINGCAPSLOCK: number = 130  */
/*     static SDL_SCANCODE_LOCKINGNUMLOCK: number = 131 */
/*     static SDL_SCANCODE_LOCKINGSCROLLLOCK: number = 132 */
    static SDL_SCANCODE_KP_COMMA: number = 133
    static SDL_SCANCODE_KP_EQUALSAS400: number = 134

    static SDL_SCANCODE_INTERNATIONAL1: number = 135 /**< used on Asian keyboards, see
                                            footnotes in USB doc */
    static SDL_SCANCODE_INTERNATIONAL2: number = 136
    static SDL_SCANCODE_INTERNATIONAL3: number = 137 /**< Yen */
    static SDL_SCANCODE_INTERNATIONAL4: number = 138
    static SDL_SCANCODE_INTERNATIONAL5: number = 139
    static SDL_SCANCODE_INTERNATIONAL6: number = 140
    static SDL_SCANCODE_INTERNATIONAL7: number = 141
    static SDL_SCANCODE_INTERNATIONAL8: number = 142
    static SDL_SCANCODE_INTERNATIONAL9: number = 143
    static SDL_SCANCODE_LANG1: number = 144 /**< Hangul/English toggle */
    static SDL_SCANCODE_LANG2: number = 145 /**< Hanja conversion */
    static SDL_SCANCODE_LANG3: number = 146 /**< Katakana */
    static SDL_SCANCODE_LANG4: number = 147 /**< Hiragana */
    static SDL_SCANCODE_LANG5: number = 148 /**< Zenkaku/Hankaku */
    static SDL_SCANCODE_LANG6: number = 149 /**< reserved */
    static SDL_SCANCODE_LANG7: number = 150 /**< reserved */
    static SDL_SCANCODE_LANG8: number = 151 /**< reserved */
    static SDL_SCANCODE_LANG9: number = 152 /**< reserved */

    static SDL_SCANCODE_ALTERASE: number = 153 /**< Erase-Eaze */
    static SDL_SCANCODE_SYSREQ: number = 154
    static SDL_SCANCODE_CANCEL: number = 155
    static SDL_SCANCODE_CLEAR: number = 156
    static SDL_SCANCODE_PRIOR: number = 157
    static SDL_SCANCODE_RETURN2: number = 158
    static SDL_SCANCODE_SEPARATOR: number = 159
    static SDL_SCANCODE_OUT: number = 160
    static SDL_SCANCODE_OPER: number = 161
    static SDL_SCANCODE_CLEARAGAIN: number = 162
    static SDL_SCANCODE_CRSEL: number = 163
    static SDL_SCANCODE_EXSEL: number = 164

    static SDL_SCANCODE_KP_00: number = 176
    static SDL_SCANCODE_KP_000: number = 177
    static SDL_SCANCODE_THOUSANDSSEPARATOR: number = 178
    static SDL_SCANCODE_DECIMALSEPARATOR: number = 179
    static SDL_SCANCODE_CURRENCYUNIT: number = 180
    static SDL_SCANCODE_CURRENCYSUBUNIT: number = 181
    static SDL_SCANCODE_KP_LEFTPAREN: number = 182
    static SDL_SCANCODE_KP_RIGHTPAREN: number = 183
    static SDL_SCANCODE_KP_LEFTBRACE: number = 184
    static SDL_SCANCODE_KP_RIGHTBRACE: number = 185
    static SDL_SCANCODE_KP_TAB: number = 186
    static SDL_SCANCODE_KP_BACKSPACE: number = 187
    static SDL_SCANCODE_KP_A: number = 188
    static SDL_SCANCODE_KP_B: number = 189
    static SDL_SCANCODE_KP_C: number = 190
    static SDL_SCANCODE_KP_D: number = 191
    static SDL_SCANCODE_KP_E: number = 192
    static SDL_SCANCODE_KP_F: number = 193
    static SDL_SCANCODE_KP_XOR: number = 194
    static SDL_SCANCODE_KP_POWER: number = 195
    static SDL_SCANCODE_KP_PERCENT: number = 196
    static SDL_SCANCODE_KP_LESS: number = 197
    static SDL_SCANCODE_KP_GREATER: number = 198
    static SDL_SCANCODE_KP_AMPERSAND: number = 199
    static SDL_SCANCODE_KP_DBLAMPERSAND: number = 200
    static SDL_SCANCODE_KP_VERTICALBAR: number = 201
    static SDL_SCANCODE_KP_DBLVERTICALBAR: number = 202
    static SDL_SCANCODE_KP_COLON: number = 203
    static SDL_SCANCODE_KP_HASH: number = 204
    static SDL_SCANCODE_KP_SPACE: number = 205
    static SDL_SCANCODE_KP_AT: number = 206
    static SDL_SCANCODE_KP_EXCLAM: number = 207
    static SDL_SCANCODE_KP_MEMSTORE: number = 208
    static SDL_SCANCODE_KP_MEMRECALL: number = 209
    static SDL_SCANCODE_KP_MEMCLEAR: number = 210
    static SDL_SCANCODE_KP_MEMADD: number = 211
    static SDL_SCANCODE_KP_MEMSUBTRACT: number = 212
    static SDL_SCANCODE_KP_MEMMULTIPLY: number = 213
    static SDL_SCANCODE_KP_MEMDIVIDE: number = 214
    static SDL_SCANCODE_KP_PLUSMINUS: number = 215
    static SDL_SCANCODE_KP_CLEAR: number = 216
    static SDL_SCANCODE_KP_CLEARENTRY: number = 217
    static SDL_SCANCODE_KP_BINARY: number = 218
    static SDL_SCANCODE_KP_OCTAL: number = 219
    static SDL_SCANCODE_KP_DECIMAL: number = 220
    static SDL_SCANCODE_KP_HEXADECIMAL: number = 221

    static SDL_SCANCODE_LCTRL: number = 224
    static SDL_SCANCODE_LSHIFT: number = 225
    static SDL_SCANCODE_LALT: number = 226 /**< alt, option */
    static SDL_SCANCODE_LGUI: number = 227 /**< windows, command (apple), meta */
    static SDL_SCANCODE_RCTRL: number = 228
    static SDL_SCANCODE_RSHIFT: number = 229
    static SDL_SCANCODE_RALT: number = 230 /**< alt gr, option */
    static SDL_SCANCODE_RGUI: number = 231 /**< windows, command (apple), meta */

    static SDL_SCANCODE_MODE: number = 257    /**< I'm not sure if this is really not covered
                                 *   by any of the above, but since there's a
                                 *   special KMOD_MODE for it I'm adding it here
                                 */

    /* @} *//* Usage page 0x07 */

    /**
     *  \name Usage page 0x0C
     *
     *  These values are mapped from usage page 0x0C (USB consumer page).
     */
    /* @{ */

    static SDL_SCANCODE_AUDIONEXT: number = 258
    static SDL_SCANCODE_AUDIOPREV: number = 259
    static SDL_SCANCODE_AUDIOSTOP: number = 260
    static SDL_SCANCODE_AUDIOPLAY: number = 261
    static SDL_SCANCODE_AUDIOMUTE: number = 262
    static SDL_SCANCODE_MEDIASELECT: number = 263
    static SDL_SCANCODE_WWW: number = 264
    static SDL_SCANCODE_MAIL: number = 265
    static SDL_SCANCODE_CALCULATOR: number = 266
    static SDL_SCANCODE_COMPUTER: number = 267
    static SDL_SCANCODE_AC_SEARCH: number = 268
    static SDL_SCANCODE_AC_HOME: number = 269
    static SDL_SCANCODE_AC_BACK: number = 270
    static SDL_SCANCODE_AC_FORWARD: number = 271
    static SDL_SCANCODE_AC_STOP: number = 272
    static SDL_SCANCODE_AC_REFRESH: number = 273
    static SDL_SCANCODE_AC_BOOKMARKS: number = 274

    /* @} *//* Usage page 0x0C */

    /**
     *  \name Walther keys
     *
     *  These are values that Christian Walther added (for mac keyboard?).
     */
    /* @{ */

    static SDL_SCANCODE_BRIGHTNESSDOWN: number = 275
    static SDL_SCANCODE_BRIGHTNESSUP: number = 276
    static SDL_SCANCODE_DISPLAYSWITCH: number = 277 /**< display mirroring/dual display
                                           switch, video mode switch */
    static SDL_SCANCODE_KBDILLUMTOGGLE: number = 278
    static SDL_SCANCODE_KBDILLUMDOWN: number = 279
    static SDL_SCANCODE_KBDILLUMUP: number = 280
    static SDL_SCANCODE_EJECT: number = 281
    static SDL_SCANCODE_SLEEP: number = 282

    static SDL_SCANCODE_APP1: number = 283
    static SDL_SCANCODE_APP2: number = 284

    /* @} *//* Walther keys */

    /* Add any other keys here. */

    static SDL_NUM_SCANCODES: number = 512 /**< not a key, just marks the number of scancodes
                                 for array bounds */
  }
}

