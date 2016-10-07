/// <reference path="model/FS.d.ts" />
/// <reference path="model/IModule.ts" />
/// <reference path="model/IResolution.ts" />
/// <reference path="model/IStdout.ts" />
/// <reference path="model/IFile.ts" />
/// <reference path="model/IControl.ts" />
/// <reference path="model/IConfig.ts" />
/// <reference path="model/Window.ts" />
/// <reference path="helper/HTMLHelper.ts" />
/// <reference path="helper/FileLoader.ts" />
/// <reference path="control/Controls.ts" />
/// <reference path="Stdout.ts" />

namespace mamejs {

  // Shortcut functions for quick use
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

    static load(url: string, stdout: IStdout): Promise<Mame> {
      //  Emscripten module
      stdout.scope.Module = <IModule> {
        arguments: [],
        screenIsReadOnly: true,
        print: stdout.print,
        printErr: stdout.printErr,
        canvas: stdout.canvas,
        noInitialRun: true,
      }

      return helper.HTMLHelper.loadScript(stdout.scope.document, url).then((): Mame => {
        return new Mame(stdout)
      })
    }

    private _controls: control.Controls
    private _files: Array<IFile> = []

    /**
     * Mame emulator must be loaded before instanciate this class
     */
    constructor(private _stdout: IStdout) {
      instances.push(this)

      // init filesystem
      FS.mkdir(Mame.ROM_PATH);
      FS.mount(MEMFS, {root: '/'}, Mame.ROM_PATH);

      this._controls = new control.Controls(this._stdout)
    }

    public get stdout(): IStdout {
      return this._stdout
    }

    public get controls(): control.Controls {
      return this._controls
    }

    public get files(): Array<IFile> {
      return this._files
    }

    public run(args: Array<string>): Promise<void> {
      return Promise.resolve(this.stdout.module.callMain(args))
    }

    public runGame(driver: string, resolution?: IResolution): Promise<void> {
      resolution = resolution || Mame.DEFAULT_RESOLUTION

      helper.HTMLHelper.resizeCanvas(this.stdout.canvas, resolution.width, resolution.height)

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
      FS.writeFile(Mame.ROM_PATH + '/' + file.name, file.data, {
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
