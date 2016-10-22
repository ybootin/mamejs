/// <reference path="IModule.ts" />
/// <reference path="FS.d.ts" />

namespace emloader {
  export interface IEmloader {
    scope: Window
    canvas: HTMLCanvasElement
    module: IModule
    stdout: Array<string>
    stderr: Array<string>
    print: {(text: string): void}
    printErr: {(error: string): void}
    resize(width: number, height: number): void
    addFS(basepath: string, fs?: FS.IFileSystem): void
    addFile(file: IFile, path: string): void
    loadFile(url: string, name: string, path: string, handler?: {(evt: ProgressEvent): void}): Promise<void>
    loadFiles(files: {[filename: string]: string}, path: string, handler?: {(evt: ProgressEvent): void}): Promise<void>
    simulateKeyEvent(type: string, keyCode: number, charCode?: number): void
  }
}
