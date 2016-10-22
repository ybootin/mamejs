/// <reference path="../../node_modules/typescript/lib/lib.es6.d.ts" />
/// <reference path="../emloader/model/IFile.ts" />
/// <reference path="../emloader/model/IEmloader.ts" />
/// <reference path="../emloader/Emloader.ts" />
/// <reference path="model/IResolution.ts" />
/// <reference path="model/IConfig.ts" />
/// <reference path="model/Window.ts" />
/// <reference path="model/IControls.ts" />
/// <reference path="control/Controls.ts" />


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

  /**
   * Holds all mame instances, usefull for debug
   */
  export var instances: Array<Mame> = []

  // Main class
  export class Mame {
    static ROM_PATH: string = '/roms'
    static DEFAULT_RESOLUTION: IResolution = {
      width: 320,
      height: 224
    }

    private _controls: IControls

    /**
     * Mame emulator must be loaded before instanciate this class
     */
    constructor(private _loader: emloader.IEmloader) {
      instances.push(this);

      // init the roms filesystem
      this.loader.addFS(Mame.ROM_PATH)

      this._controls = new control.Controls(this)
    }

    public get loader(): emloader.IEmloader {
      return this._loader
    }

    public get controls(): IControls {
      return this._controls
    }

    public run(args: Array<string>): Promise<void> {
      return Promise.resolve(this.loader.module.callMain(args))
    }

    public runGame(driver: string, resolution?: IResolution): Promise<void> {
      resolution = resolution || Mame.DEFAULT_RESOLUTION

      this.loader.resize(resolution.width, resolution.height)

      return this.run([
        driver,
        '-verbose',
        '-window',
        '-rompath',
        Mame.ROM_PATH,
        '-resolution',
        [resolution.width, resolution.height].join('x'),
        '-samplerate',
        '48000',
      ])
    }

    public addRom(file: emloader.IFile): void {
      this.loader.addFile(file, Mame.ROM_PATH)
    }

    public loadRom(url: string, name: string, handler?: {(evt: ProgressEvent): void}): Promise<void> {
      return this.loader.loadFile(url, name, Mame.ROM_PATH, handler)
    }

    public loadRoms(files: {[filename: string]: string}, handler?: {(evt: ProgressEvent): void}): Promise<void> {
      return this.loader.loadFiles(files, Mame.ROM_PATH, handler)
    }
  }
}
