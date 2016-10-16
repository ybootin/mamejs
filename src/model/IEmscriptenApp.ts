/// <reference path="IControls.ts" />
/// <reference path="IModule.ts" />

namespace mamejs {
  export interface IEmscriptenApp {
    scope: Window
    canvas: HTMLCanvasElement
    module: IModule
    stdout: Array<string>
    stderr: Array<string>
    print: {(text: string): void}
    printErr: {(error: string): void}
    resize(width: number, height: number): void
  }
}
