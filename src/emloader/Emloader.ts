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

interface CSSStyleDeclaration {
  imageRendering: string
}

namespace emloader {
  export function load(url: string, container: HTMLElement, emModule?: any): Promise<Emloader> {
    emModule = emModule || {}
    // By default, if no function specified, we try to locate the file at the same level than the url
    emModule.locateFile = emModule.locateFile || function(file: string): string {
      if (file.substr(-4) === '.mem') {
        return url + '.mem'
      }
      return file
    }

    let emloader = new Emloader(container, emModule)

    return helper.HTMLHelper.loadScript(emloader.scope.document, url).then((): Emloader => {
      return emloader
    })
  }

  export function loadHeadless(url: string, emModule?: any): Promise<Emloader> {
    let container = document.createElement('div')
    container.style.display = 'none'

    document.body.appendChild(container)

    return load(url, container, emModule)
  }

  export class Emloader extends event.EventEmiter implements IEmloader {

    static ON_STDERROR: 'onstderror'
    static ON_STDOUT: 'onstdout'

    static triggerEvent(emModule: IModule, eventType: string, data: any = {}) {
      let scope = helper.HTMLHelper.getWindow(emModule.canvas)
      let e = (<any>scope).document.createEventObject ? (<any>scope).document.createEventObject() : scope.document.createEvent("Events");
      if (e.initEvent) e.initEvent(eventType, true, true);

      for (var att in data) {
        if (data.hasOwnProperty(att) && e[att] === undefined) {
          e[att] = data[att]
        }
      }

      // Dispatch to browser for real (use this if page uses SDL or something else for event handling):
      emModule.canvas.dispatchEvent ? emModule.canvas.dispatchEvent(e) : (<any>emModule).canvas.fireEvent("on" + eventType, e);
    }

    private _stdout: Array<string> = []
    private _stderr: Array<string> = []

    private _scope: Window
    private _iframe: HTMLIFrameElement

    private _files: Array<IFile> = []

    private _keyHandler: KeyHandler

    protected _canvas: HTMLCanvasElement

    constructor(private _container: HTMLElement, defaultModule: any) {
      super()

      // Iframe Mame prevent from loading the emscriptem app in the main scope
      this._iframe = helper.HTMLHelper.createIframe(helper.HTMLHelper.getWindow(this._container).document)
      this._container.appendChild(this._iframe)

      // default css redering options for canvas
      // canvas will always fit to the container width/height
      let canvaCSS = 'width:100%;height:100%;';
      ['-moz-crisp-edges', '-o-crisp-edges', '-webkit-optimize-contrast', 'optimize-contrast', 'crisp-edges', 'pixelated', 'optimizeSpeed'].forEach((value) => {
        canvaCSS += 'image-rendering:' + value + ';'
      })

      this._iframe.contentWindow.document.write('<!doctype html><html><head><style>canvas {' + canvaCSS + '}</style></head><body style="margin:0px;padding:0px"><canvas/></body></html>')
      this._iframe.contentWindow.document.close()

      this._scope = this._iframe.contentWindow
      this._canvas = this._scope.document.getElementsByTagName('canvas')[0];

      //  Emscripten module
      this._scope.Module = <IModule><any>{}
      for (var att in defaultModule) {
        if (defaultModule.hasOwnProperty(att)) {
          this._scope.Module[att] = defaultModule[att]
        }
      }

      this._scope.Module.arguments = defaultModule.arguments || []
      this._scope.Module.screenIsReadOnly = defaultModule.screenIsReadOnly || false
      this._scope.Module.print = (text: string): void => {
        this._stdout.push(text)
        if (typeof defaultModule.print === 'function') {
          defaultModule.print(text)
        }

        this.emit(Emloader.ON_STDOUT)
      }
      this._scope.Module.printErr = (err: string): void => {
        this._stderr.push(err)
        if (typeof defaultModule.printErr === 'function') {
          defaultModule.printErr(err)
        }

        this.emit(Emloader.ON_STDERROR)
      }
      this._scope.Module.canvas = this.canvas
      this._scope.Module.noInitialRun = defaultModule.noInitialRun || true

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

    public addFS(basepath: string, fs?: FS.IFileSystem): void {
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
