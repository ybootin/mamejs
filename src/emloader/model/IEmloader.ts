/// <reference path="IModule.ts" />
/// <reference path="FS.d.ts" />
/// <reference path="../KeyHandler.ts" />

namespace emloader {
  export interface IEmloader {
    keyHandler: KeyHandler
    scope: Window
    canvas: HTMLCanvasElement
    module: IModule
    stdout: Array<string>
    stderr: Array<string>
    print: {(text: string): void}
    printErr: {(error: string): void}
    addFS(basepath: string, fs?: FS.IFileSystem): void
    addFile(file: IFile, path: string): void
    loadFile(url: string, name: string, path: string, handler?: {(evt: ProgressEvent): void}): Promise<void>
    loadFiles(files: {[filename: string]: string}, path: string, handler?: {(evt: ProgressEvent): void}): Promise<void>
  }
}
