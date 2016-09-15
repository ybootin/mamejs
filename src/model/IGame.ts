/// <reference path="IResolution.ts" />
/// <reference path="IFile.ts" />

namespace mamejs {
  export interface IGame {
    /**
     * Required files to be loaded in the Emscripten fs (rom, drivers ...)
     *
     * Usage : files = {
     *   'romname.zip' : 'http://domain.com/url/romname.zip'
     * }
     */
    files: {[romname: string]: string},
    /**
     * driver name
     */
    driver: string,
    /**
     * javascript emulator url
     */
    emulator: string,
    /**
     * native game resolution
     */
    resolution: IResolution

    data?: Array<IFile>
  }
}
