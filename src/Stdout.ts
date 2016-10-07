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

    protected _canvas: HTMLCanvasElement

    constructor(private _container: HTMLElement) {
      super()
      this._scope = helper.HTMLHelper.getWindow(this._container)
      this._canvas = this._scope.document.createElement('canvas')

      this._container.appendChild(this._canvas)
    }

    public get canvas(): HTMLCanvasElement {
      return this._canvas
    }

    public get scope(): Window {
      return this._scope
    }

    public get module(): IModule {
      return this._scope.Module
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
  }
}
