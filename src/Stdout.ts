/// <reference path="model/Window.ts" />
/// <reference path="event/EventEmiter.ts" />
/// <reference path="helper/HTMLHelper.ts" />

namespace mamejs {
  export class Stdout extends event.EventEmiter implements IStdout {
    static ON_STDERROR: 'stderror'
    static ON_STDOUT: 'stdout'

    private _stdout: Array<string> = []
    private _stderr: Array<string> = []

    private _scope: Window
    private _iframe: HTMLIFrameElement

    protected _canvas: HTMLCanvasElement

    constructor(private _container: HTMLElement) {
      super()

      // Iframe Mame prevent from loading the emscriptem app in the main scope
      this._iframe = helper.HTMLHelper.createIframe(helper.HTMLHelper.getWindow(this._container).document)
      this._container.appendChild(this._iframe)

      this._iframe.contentWindow.document.write('<!doctype html><html><head></head><body style="margin:0px;padding:0px"></body></html>')
      this._iframe.contentWindow.document.close()


      this._scope = this._iframe.contentWindow
      this._canvas = this._scope.document.createElement('canvas')

      this._iframe.contentWindow.document.body.appendChild(this._canvas)
    }

    public get canvas(): HTMLCanvasElement {
      return this._canvas
    }

    public get scope(): Window {
      return this._scope
    }

    public get stdout(): Array<string> {
      return this._stdout
    }

    public get stderr(): Array<string> {
      return this._stderr
    }

    public print(text: string): void {
      this.emit(Stdout.ON_STDOUT)
      this._stdout.push(text)
    }

    public printErr(error: string): void {
      this.emit(Stdout.ON_STDERROR)
      this._stderr.push(error)
    }

    public resize(width: number, height: number): void {
      this._iframe.style.width = width + 'px'
      this._iframe.style.height = height + 'px'

      helper.HTMLHelper.resizeCanvas(this.canvas, width, height)
    }
  }
}
