/// <reference path="IResolution.ts" />
/// <reference path="IFile.ts" />

namespace mamejs {
  export interface IGame {
    /**
     * driver name
     */
    driver: string,

    /**
     * Required files to be loaded in the Emscripten fs (rom, drivers ...)
     *
     * Usage : files = {
     *   'romname.zip' : 'http://domain.com/url/romname.zip'
     * }
     */
    files: {[romname: string]: string},

    /**
     * native game resolution
     */
    resolution?: IResolution

  }
}
