/// <reference path="../../typings/FS.d.ts" />
/// <reference path="../model/IFile.ts" />

namespace mamejs.helper {
  export class FileSystem {
    static init(path: string, files: Array<IFile>): void {
      FS.mkdir(path);
      FS.mount(MEMFS, {root: '/'}, path);

      files.forEach((file: IFile): void => {
        FS.writeFile(path + '/' + file.name, file.data, {
          encoding: 'binary'
        })
      })
    }
  }
}
