declare var MEMFS: FS.IFileSystem
declare namespace FS {
  function mkdir(path: string): void
  function mount(fs: FS.IFileSystem, basePath: IPath, path: string): void
  function writeFile(path: string, data: Uint8Array, options: any): void
  interface IPath {
    root: string
  }

  interface IFileSystem {}
}
