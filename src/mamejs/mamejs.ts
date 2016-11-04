/// <reference path="../emloader/model/IEmloader.ts" />
/// <reference path="../emloader/Emloader.ts" />
/// <reference path="model/IConfig.ts" />
/// <reference path="Mame.ts" />
/// <reference path="Controllers.ts" />

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

  export var controllers = new Controllers()

  // Default behavior
  controllers.bind()
}
