/// <reference path="../../typings/FS.d.ts" />
/// <reference path="../model/IFile.ts" />

namespace mamejs.helper {
  export class FileSystem {
    static init(scope: Window, path: string, files: Array<IFile>): void {
      FS.mkdir(path);
      FS.mount(MEMFS, {root: '/'}, path);

      files.forEach((file: IFile): void => {
        FileSystem.writeFile(scope, path, file)
      })
    }

    static writeFile(scope: Window, path: string, file: IFile): void {
      FS.writeFile(path + '/' + file.name, file.data, {
        encoding: 'binary'
      })
    }
  }
}
