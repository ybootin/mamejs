/// <reference path="../emloader/model/IEmloader.ts" />
/// <reference path="../emloader/model/IControls.ts" />
/// <reference path="model/IConfig.ts" />
/// <reference path="../emloader/controllers/Controllers.ts" />
/// <reference path="../emloader/Emloader.ts" />
/// <reference path="mame/ControllersMapping.ts" />
/// <reference path="mame/Mame.ts" />

namespace mamejs {

  export function load(url: string, container: HTMLElement): Promise<Mame> {
    return emloader.load(url, container).then((loader: emloader.IEmloader): Mame => {
      let mame = new Mame(loader)
      controllers.setKeyHandler(mame.keyHandler)

      return mame
    })
  }

  export function run(config: IConfig, container: HTMLElement): Promise<Mame> {
    return load(config.emulator, container).then(function(mame: Mame): Promise<Mame> {
      return mame.loadRoms(config.game.files).then(function() {
        return mame.runGame(config.game.driver, config.resolution).then(function(): Mame {
          return mame
        })
      })
    })
  }

  // register available controllers
  let controlsMapping: Array<emloader.IControlMapping> = Object.keys(ControllersMapping).map((mappingName: string) => {
    let mapping: emloader.IControlMapping = <emloader.IControlMapping><any>{}
    Object.keys(ControllersMapping[mappingName]).forEach((controlName: string): void => {
      mapping[controlName] = MameKey[ControllersMapping[mappingName][controlName]]
    })
    return mapping
  })

  export var controllers: emloader.Controllers = new emloader.Controllers(controlsMapping)

  // let emiter = new emloader.event.EventEmiter()

  // export function on(eventName: string, callback: Function): void {
  //   emiter.on(eventName, callback)
  // }
  // export function off(eventName: string, callback: Function): void {
  //   emiter.on(eventName, callback)
  // }

  // controllers.on(Controllers.KEYPRESS, (keyCode: number) => {
  //   emiter.emit('mamekeypress', MameKeyMameKeyCode[keyCode])
  // })
  // controllers.on(Controllers.KEYRELEASE, (keyCode: number) => {
  //   emiter.emit('mamekeyrelease', MameKeyMameKeyCode[keyCode])
  // })
}
