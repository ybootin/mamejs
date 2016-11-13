/// <reference path="model/FS.d.ts" />
/// <reference path="model/Window.ts" />
/// <reference path="model/IFile.ts" />
/// <reference path="model/IModule.ts" />
/// <reference path="model/IEmloader.ts" />
/// <reference path="event/EventEmiter.ts" />
/// <reference path="helper/HTMLHelper.ts" />
/// <reference path="helper/FileLoader.ts" />
/// <reference path="KeyHandler.ts" />
/// <reference path="plugins/VirtualController.ts" />

namespace emloader {
  export function load(url: string, container: HTMLElement): Promise<Emloader> {
    let emloader = new Emloader(container)
    emloader.scope.Module.locateFile = (file) => {
      if (file.substr(-4) === '.mem') {
        return url + '.mem'
      }
    }

    return helper.HTMLHelper.loadScript(emloader.scope.document, url).then((): Emloader => {
      return emloader
    })
  }

  export class Emloader extends event.EventEmiter implements IEmloader {

    static ON_STDERROR: 'onstderror'
    static ON_STDOUT: 'onstdout'

    static triggerEvent(module: IModule, eventType: string, data: any = {}) {
      let scope = helper.HTMLHelper.getWindow(module.canvas)
      let e = (<any>scope).document.createEventObject ? (<any>scope).document.createEventObject() : scope.document.createEvent("Events");
      if (e.initEvent) e.initEvent(eventType, true, true);

      for (var att in data) {
        if (data.hasOwnProperty(att) && e[att] === undefined) {
          e[att] = data[att]
        }
      }

      // Dispatch to browser for real (use this if page uses SDL or something else for event handling):
      module.canvas.dispatchEvent ? module.canvas.dispatchEvent(e) : (<any>module).canvas.fireEvent("on" + eventType, e);
    }

    private _stdout: Array<string> = []
    private _stderr: Array<string> = []

    private _scope: Window
    private _iframe: HTMLIFrameElement

    private _files: Array<IFile> = []

    private _keyHandler: KeyHandler

    protected _canvas: HTMLCanvasElement

    constructor(private _container: HTMLElement) {
      super()

      // Iframe Mame prevent from loading the emscriptem app in the main scope
      this._iframe = helper.HTMLHelper.createIframe(helper.HTMLHelper.getWindow(this._container).document)
      this._container.appendChild(this._iframe)

      this._iframe.contentWindow.document.write('<!doctype html><html><head></head><body style="margin:0px;padding:0px"><canvas/></body></html>')
      this._iframe.contentWindow.document.close()

      this._scope = this._iframe.contentWindow
      this._canvas = this._scope.document.getElementsByTagName('canvas')[0]

      //  Emscripten module
      this._scope.Module = <IModule> {
        arguments: [],
        screenIsReadOnly: false,
        print: (text: string): void => this.print(text),
        printErr: (err: string): void => this.printErr(err),
        canvas: this.canvas,
        noInitialRun: true,
      }

      var events = ['keyup', 'keydown']
      events.forEach((evtName: string): void => {
        this._canvas.addEventListener(evtName, (evt: Event) => {
          this.emit(evtName, evt)
        })
      })

      this._keyHandler = new KeyHandler(this.module)
    }

    public get keyHandler(): KeyHandler {
      return this._keyHandler
    }

    public get canvas(): HTMLCanvasElement {
      return this._canvas
    }

    public get scope(): Window {
      return this._scope
    }

    public get module(): IModule {
      return this.scope.Module
    }

    public get stdout(): Array<string> {
      return this._stdout
    }

    public get stderr(): Array<string> {
      return this._stderr
    }

    public get files(): Array<IFile> {
      return this._files
    }

    public get FS(): any {
      return (<any>this.scope).FS
    }

    public print(text: string): void {
      this.emit(Emloader.ON_STDOUT)
      this._stdout.push(text)
    }

    public printErr(error: string): void {
      this.emit(Emloader.ON_STDERROR)
      this._stderr.push(error)
    }

    public resize(width: number, height: number): void {
      this._iframe.style.width = width + 'px'
      this._iframe.style.height = height + 'px'

      helper.HTMLHelper.resizeCanvas(this.canvas, width, height)
    }

    public addFS(basepath: string, fs?: FS.IFileSystem): void {
      this.FS.mkdir(basepath);
      this.FS.mount(fs || (<any>this.scope).MEMFS, {root: '/'}, basepath);
    }

    public addFile(file: IFile, path: string): void {
      this.FS.writeFile(path + '/' + file.name, file.data, {
        encoding: 'binary'
      })
      this._files.push(file)
    }

    public loadFile(url: string, name: string, path: string, handler?: {(evt: ProgressEvent): void}): Promise<void> {
      return helper.FileLoader.loadFile(url, name, handler).then((file: IFile): void => this.addFile(file, path))
    }

    public loadFiles(files: {[filename: string]: string}, path: string, handler?: {(evt: ProgressEvent): void}): Promise<void> {
      return Promise.all(Object.keys(files).map((name: string): Promise<void> => {
        return this.loadFile(files[name], name, path, handler)
      })).then((): Promise<void> => {
        return Promise.resolve()
      })
    }
  }
}
