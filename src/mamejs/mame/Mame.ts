/// <reference path="../../../node_modules/typescript/lib/lib.es6.d.ts" />
/// <reference path="../../emloader/model/IFile.ts" />
/// <reference path="../../emloader/model/IEmloader.ts" />
/// <reference path="../../emloader/Emloader.ts" />
/// <reference path="../../emloader/helper/FileLoader.ts" />
/// <reference path="../model/IResolution.ts" />
/// <reference path="../model/Window.ts" />
/// <reference path="../mamejs.ts" />
/// <reference path="Ctrlr.ts" />


namespace mamejs {

  // Main class
  export class Mame {
    static ROM_PATH: string = '/roms'
    static DEFAULT_RESOLUTION: IResolution = {
      width: 320,
      height: 224
    }

    /**
     * Mame emulator must be loaded before instanciate this class
     */
    constructor(private _loader: emloader.IEmloader) {
      // init the roms filesystem
      this.loader.addFS(Mame.ROM_PATH)

      // generate .cfg controller keymaping file, and mount it into FS
      // as this we have full controls on key
      // TODO, this shouldn't be done here, but as we don't expose ctrlr, it do the job !
      this.loader.addFS('/ctrlr')
      this.loader.addFile({
        url: '',
        name: 'mamejs.cfg',
        data: emloader.helper.FileLoader.toUint8Array(Ctrlr.generateCfgFile()),
      }, '/ctrlr')
    }

    public get loader(): emloader.IEmloader {
      return this._loader
    }

    public get keyHandler(): emloader.IControlKeyHandler {
      return this.loader.keyHandler
    }

    public run(args: Array<string>): Promise<void> {
      return Promise.resolve(this.loader.module.callMain(args))
    }

    public runGame(driver: string, resolution?: IResolution): Promise<void> {
      resolution = resolution || Mame.DEFAULT_RESOLUTION

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
        '-ctrlr',
        'mamejs'
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
