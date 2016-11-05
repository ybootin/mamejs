/// <reference path="IResolution.ts" />
/// <reference path="IGame.ts" />

namespace mamejs {
  export interface IConfig {
    /**
     * Emulator URL
     */
    emulator: string

    /**
     * screen resolution
     */
    resolution?: IResolution

    /**
     * the game to load ;)
     * if missing, upload screen displayed if not setted
     */
    game?: IGame
  }
}
