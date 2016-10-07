/// <reference path="model/IModule.ts" />
/// <reference path="model/IResolution.ts" />
/// <reference path="model/IStdout.ts" />
/// <reference path="model/IFile.ts" />
/// <reference path="model/IControl.ts" />
/// <reference path="model/IConfig.ts" />
/// <reference path="model/Window.ts" />
/// <reference path="helper/HTMLHelper.ts" />
/// <reference path="helper/FileSystem.ts" />
/// <reference path="helper/FileLoader.ts" />
/// <reference path="control/Controls.ts" />
/// <reference path="Stdout.ts" />

namespace mamejs {

  // Shortcut functions for quit use
  export function load(url: string, container: HTMLElement): Promise<Mame> {
    return Mame.load(url, new Stdout(container))
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

    static load(url: string, stdout: IStdout, files: Array<IFile> = [], module: IModule = null): Promise<Mame> {
      stdout.scope.Module = module || Mame.getDefaultModule(stdout, files)

      return helper.HTMLHelper.loadScript(stdout.scope.document, url).then((): Mame => {
        return new Mame(stdout)
      })
    }

    static run(module: IModule, args: Array<string> = []): Promise<void> {
      module.callMain(args)

      // @todo wait for stdout or stderr
      return Promise.resolve()
    }

    static parseStderr(stderr: any): void {
      // @todo, search for proposal drivers into stderr when a game fail to load
    }

    static getDefaultModule(stdout: IStdout, files: Array<IFile> = []) {
      return {
        arguments: [],
        screenIsReadOnly: true,
        print: function (text: string): void {
          stdout.print(text)
        },
        printErr: function(error: string): void {
          stdout.printErr(error)
        },
        canvas: stdout.canvas,
        noInitialRun: true,
        preInit: () => helper.FileSystem.init(stdout.scope, Mame.ROM_PATH, files),
      }
    }

    static getGameArgs(driver: string, resolution?: IResolution): Array<string> {
      resolution = resolution || Mame.DEFAULT_RESOLUTION
      return [
        driver,
        '-verbose',
        '-window',
        '-rompath',
        Mame.ROM_PATH,
        '-resolution',
        [resolution.width, resolution.height].join('x'),
        '-samplerate',
        '48000',
      ]
    }

    private _controls: control.Controls
    private _files: Array<IFile> = []
    private _module: IModule

    constructor(private _stdout: IStdout) {
      instances.push(this)
      this._controls = new control.Controls(this._stdout)
      this._module = this._stdout.module
    }

    public get stdout(): IStdout {
      return this._stdout
    }

    public get controls(): control.Controls {
      return this._controls
    }

    public get module(): IModule {
      return this._module
    }

    public get files(): Array<IFile> {
      return this._files
    }

    public run(args: Array<string>): Promise<void> {
      return Mame.run(this.module, args)
    }

    public runGame(driver: string, resolution?: IResolution): Promise<void> {
      return Mame.run(this.module, Mame.getGameArgs(driver, resolution))
    }

    public loadRom(url: string, name: string, handler?: {(evt: ProgressEvent): void}): Promise<void> {
      return helper.FileLoader.loadFile(url, name, handler).then((file: IFile): void => {
        helper.FileSystem.writeFile(this.stdout.scope, Mame.ROM_PATH, file)
        this._files.push(file)
      })
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
