namespace mamejs.control {
  export function generateCtlrCfg(data: {[mameKey: string]: string}): string {
    let cfgFile = '<mameconfig version="10">' +
                    '<system name="default">' +
                      '<input>'
    for (let mameKey in data) {
       cfgFile +=       '<port type="' + mameKey + '">' +
                           '<newseq type="standard">' + data[mameKey] + '</newseq>' +
                        '</port>'
    }
    cfgFile +=        '</input>' +
                    '</system>' +
                  '</mameconfig>'

    return cfgFile
  }
}
