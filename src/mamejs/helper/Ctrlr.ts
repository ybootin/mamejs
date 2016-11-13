/// <reference path="../MameKey.ts" />

namespace mamejs.helper {
  export class Ctrlr {
    static generateCfgFile(): string {
      let MameKeyCodeKey = {}
      for (let mameKeyCode in MameKeyCode) {
        if (MameKeyCode[mameKeyCode]) {
          MameKeyCodeKey[MameKeyCode[mameKeyCode]] = mameKeyCode
        }
      }

      // This is the default map for the user keyboard, by default we don't map multiple key touch
      let MameKeyMameKeyCode: { [mameKey: string]: string; } = {}
      for (let mameKey in MameKey) {
        if (typeof MameKey[mameKey] === 'number') {
          MameKeyMameKeyCode[mameKey] = MameKeyCodeKey[MameKey[mameKey]]
        }
      }

      let cfgFile = '<mameconfig version="10">' +
                      '<system name="default">' +
                        '<input>'
      for (let mameKey in MameKeyMameKeyCode) {
         cfgFile +=       '<port type="' + mameKey + '">' +
                             '<newseq type="standard">' + MameKeyMameKeyCode[mameKey] + '</newseq>' +
                          '</port>'
      }
      cfgFile +=        '</input>' +
                      '</system>' +
                    '</mameconfig>'

      return cfgFile
    }
  }
}
