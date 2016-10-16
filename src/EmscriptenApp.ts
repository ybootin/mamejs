/// <reference path="model/Window.ts" />
/// <reference path="model/IEmscriptenApp.ts" />
/// <reference path="event/EventEmiter.ts" />
/// <reference path="helper/HTMLHelper.ts" />
/// <reference path="control/Controls.ts" />

namespace mamejs {
  export class EmscriptenApp extends event.EventEmiter implements IEmscriptenApp {
    static ON_STDERROR: 'stderror'
    static ON_STDOUT: 'stdout'

    private _stdout: Array<string> = []
    private _stderr: Array<string> = []

    private _scope: Window
    private _iframe: HTMLIFrameElement

    private _controls: IControls
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

      // Map all keyboard keys to the iframed canvas
      let onEvt = (evt: KeyboardEvent): void => {
        helper.EmscriptenHelper.simulateKeyEvent(this.module, evt.type, evt.keyCode, evt.charCode)
      }

      // Must be attached to the main scope, in order to redispatch them to the emScope
      document.addEventListener('keyup', onEvt)
      document.addEventListener('keydown', onEvt)
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

    public print(text: string): void {
      this.emit(EmscriptenApp.ON_STDOUT)
      this._stdout.push(text)
    }

    public printErr(error: string): void {
      this.emit(EmscriptenApp.ON_STDERROR)
      this._stderr.push(error)
    }

    public resize(width: number, height: number): void {
      this._iframe.style.width = width + 'px'
      this._iframe.style.height = height + 'px'

      helper.HTMLHelper.resizeCanvas(this.canvas, width, height)
    }
  }
}
