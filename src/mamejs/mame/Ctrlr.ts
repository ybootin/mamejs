/// <reference path="MameKey.ts" />

namespace mamejs {
  export class Ctrlr {
    static generateCfgFile(): string {
      let mameKeyCodeKey = {}
      for (let mameKeyCode in MameKeyCode) {
        if (MameKeyCode[mameKeyCode]) {
          mameKeyCodeKey[MameKeyCode[mameKeyCode]] = mameKeyCode
        }
      }

      // This is the default map for the user keyboard, by default we don't map multiple key touch
      let mameKeyMameKeyCode: { [mameKey: string]: string; } = {}
      for (let mameKey in MameKey) {
        if (typeof MameKey[mameKey] === 'number') {
          mameKeyMameKeyCode[mameKey] = mameKeyCodeKey[MameKey[mameKey]]
        }
      }

      let cfgFile = '<mameconfig version="10">' +
                      '<system name="default">' +
                        '<input>'
      for (let mameKey in mameKeyMameKeyCode) {
         cfgFile +=       '<port type="' + mameKey + '">' +
                             '<newseq type="standard">' + mameKeyMameKeyCode[mameKey] + '</newseq>' +
                          '</port>'
      }
      cfgFile +=        '</input>' +
                      '</system>' +
                    '</mameconfig>'

      return cfgFile
    }
  }
}
