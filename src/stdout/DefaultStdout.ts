namspace mamejs.stdout {
  export class DefaultStdout implements IStdout {
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

    public get stdout(): Window {
      return this._stdout
    }

    public get stderr(): Window {
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
