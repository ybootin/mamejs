namespace mamejs.stdout {
  export class Stdout implements IStdout {
    private _stdout: Array<string> = []
    private _stderr: Array<string> = []

    protected _canvas: HTMLCanvasElement

    constructor(private _scope: Window = window, canvas?: HTMLCanvasElement) {
      this._canvas = canvas || _scope.document.createElement('canvas')
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
      this._stdout.push(text)
    }

    public printErr(error: string): void {
      this._stderr.push(error)
    }
  }
}
