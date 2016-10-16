/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />
/// <reference path="model/FS.d.ts" />
/// <reference path="model/IModule.ts" />
/// <reference path="model/IResolution.ts" />
/// <reference path="model/IFile.ts" />
/// <reference path="model/IConfig.ts" />
/// <reference path="model/Window.ts" />
/// <reference path="helper/HTMLHelper.ts" />
/// <reference path="helper/FileLoader.ts" />
/// <reference path="model/IEmscriptenApp.ts" />
/// <reference path="EmscriptenApp.ts" />

namespace mamejs {

  // Shortcut functions for quick use
  export function load(url: string, container: HTMLElement): Promise<Mame> {
    return Mame.load(url, new EmscriptenApp(container))
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

    static load(url: string, emApp: IEmscriptenApp): Promise<Mame> {
      return helper.HTMLHelper.loadScript(emApp.scope.document, url).then((): Mame => {
        return new Mame(emApp)
      })
    }

    private _files: Array<IFile> = []

    private _controls: IControls

    /**
     * Mame emulator must be loaded before instanciate this class
     */
    constructor(private _emApp: IEmscriptenApp) {
      instances.push(this);

      // init the /roms filesystem
      (<any>this.emApp.scope).FS.mkdir(Mame.ROM_PATH);
      (<any>this.emApp.scope).FS.mount((<any>this.emApp.scope).MEMFS, {root: '/'}, Mame.ROM_PATH);

      this._controls = new control.Controls(this.emApp.module)
    }

    public get emApp(): IEmscriptenApp {
      return this._emApp
    }

    public get controls(): IControls {
      return this._controls
    }

    public get files(): Array<IFile> {
      return this._files
    }

    public run(args: Array<string>): Promise<void> {
      return Promise.resolve(this.emApp.module.callMain(args))
    }

    public runGame(driver: string, resolution?: IResolution): Promise<void> {
      resolution = resolution || Mame.DEFAULT_RESOLUTION

      this.emApp.resize(resolution.width, resolution.height)

      helper.HTMLHelper.resizeCanvas(this.emApp.canvas, resolution.width, resolution.height)

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

    public addRom(file: IFile): void {
      (<any>this.emApp.scope).FS.writeFile(Mame.ROM_PATH + '/' + file.name, file.data, {
        encoding: 'binary'
      })
      this._files.push(file)
    }

    public loadRom(url: string, name: string, handler?: {(evt: ProgressEvent): void}): Promise<void> {
      return helper.FileLoader.loadFile(url, name, handler).then((file: IFile): void => this.addRom(file))
    }

    public loadRoms(files: {[filename: string]: string}, handler?: {(evt: ProgressEvent): void}): Promise<void> {
      return Promise.all(Object.keys(files).map((name: string): Promise<void> => {
        return this.loadRom(files[name], name, handler)
      })).then((): Promise<void> => {
        return Promise.resolve()
      })
    }
  }
}
