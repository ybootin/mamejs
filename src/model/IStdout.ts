namespace mamejs {
  export class IStdout {
    scope: Window
    canvas: HTMLCanvasElement
    stdout: Array<string>
    stderr: Array<string>
    print: function(text: string): void
    printErr: function(error: string): void
  }
}
