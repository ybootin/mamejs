/// <reference path="event/EventEmmiter.ts" />

namespace mamejs {
  export function run(config: IConfig, container: HTMLElement): MameJS {
    let mamejs = new MameJS(config, container)

    mamejs.render()
  }
  export class MameJS extends event.EventEmitter {
    private _mame: mame.Mame
    private _filesLoaded: boolean = false
    private _isRendered: boolean = false
    private _width: number
    private _height: number

    private _ui: UI
    private _stdout: IStdout
    private _files: Array<IFile> = []

    constructor(private config: IConfig, private container: HTMLElement) {
      this._stdout = new mame.Stdout(container.ownerDocument.defaultView || (<any>container.ownerDocument).parentWindow)
      this._ui = new UI(this.config.template || atob(UI.template))
    }

    public get width(): number {
      return this._width
    }

    public get height(): number {
      return this._height
    }

    public get mame(): mame.Mame {
      return this._mame
    }

    public get files(): Array<IFile> {
      return this.files
    }

    public render(): void {
      this._ui.render()
    }

    public runMame(progressHandler?: IProgressHandler): Promise<mame.Mame> {
      this.emit(event.MameJS.FILES_LOAD_START)

      let customProgressHandler = (fileUrl: string, evt: ProgressEvent): void => {
        if (typeof progressHandler === 'function') {
          progressHandler({url: fileUrl, event: evt})
        }
        this.emit(FILE_PROGRESS, {url: fileUrl, event: evt})
      }

      return helper.FileLoader.loadFilesOneByOne(config.game.files, customProgressHandler).then(function(files: Array<IFile>) {
        this._files = files
        this.emit(event.MameJS.FILES_LOADED)
        return Mame.load(this.config.emulator, this._stdout, files)
      }).then((mame: mame.Mame): mame.Mame => {
        this._mame = mame

        return mame
      }
    }

    public resize(width: number, height: number): void {
      this._width = width
      this._width = height
      this.emit(event.MameJS.SIZE_CHANGE)
    }
  }
}
