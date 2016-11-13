/// <reference path="../emloader/model/IEmloader.ts" />
/// <reference path="../emloader/Emloader.ts" />
/// <reference path="model/IConfig.ts" />
/// <reference path="Mame.ts" />
/// <reference path="Controllers.ts" />
/// <reference path="ControllersMapping.ts" />
/// <reference path="plugins/VirtualController.ts" />

namespace mamejs {

  export function load(url: string, container: HTMLElement): Promise<Mame> {
    return emloader.load(url, container).then((loader: emloader.IEmloader): Mame => {
      return new Mame(loader)
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

  // default keyboard mapping, handle only registered mame keys
  let keyboardMapping: {[key: string]: number} = {}
  Object.keys(MameKey).forEach((mameKey: string): void => {
    keyboardMapping[emloader.helper.KeyCodeKey[MameKey[mameKey]]] = MameKey[mameKey]
  })

  // remap controllers with real keys
  let controlsMapping: Array<IControlMapping> = Object.keys(ControllersMapping).map((mappingName: string) => {
    let mapping: IControlMapping = <IControlMapping><any>{}
    Object.keys(ControllersMapping[mappingName]).forEach((controlName: string): void => {
      mapping[controlName] = MameKey[ControllersMapping[mappingName][controlName]]
    })
    return mapping
  })

  export var controllers: Controllers = new Controllers(controlsMapping)
  controllers.keyboard.setKeyMapping(keyboardMapping)

  let emiter = new emloader.event.EventEmiter()

  export function on(eventName: string, callback: Function): void {
    emiter.on(eventName, callback)
  }
  export function off(eventName: string, callback: Function): void {
    emiter.on(eventName, callback)
  }

  controllers.on(Controllers.KEYPRESS, (keyCode: number) => {
    emiter.emit('mamekeypress', MameKeyMameKeyCode[keyCode])
  })
  controllers.on(Controllers.KEYRELEASE, (keyCode: number) => {
    emiter.emit('mamekeyrelease', MameKeyMameKeyCode[keyCode])
  })

}
