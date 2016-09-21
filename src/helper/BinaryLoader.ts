namespace mamejs.helper {
  export class BinaryLoader {

    static loadFiles(files: {[filename: string]: string}): Promise<IFile[]> {
      return Promise.all(Object.keys(files).map((name: string): Promise<IFile> => {
        return BinaryLoader.loadFile(files[name], name)
      }))
    }

    static loadFile(url: string, name: string): Promise<IFile> {
      // fetch file, and update game data
      return BinaryLoader.fetchFile(url).then(function(data: ArrayBuffer): IFile {
        return {
          url: url,
          name: name,
          data: new Uint8Array(data)
        }
      })
    }

    // XHR file loader
    static fetchFile(url: string): Promise<ArrayBuffer> {
      return new Promise(function (resolve, reject): void {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        let errorMsg: string = 'error loading ' + url

        xhr.onload = function (e) {
          if (xhr.status === 200) {
            resolve(<ArrayBuffer>xhr.response);
          } else {
            reject(errorMsg + ' : status code ' + xhr.status);
          }
        }
        xhr.onerror = function (e) {
          reject(errorMsg + ' : ' + e.toString());
        };
        xhr.send();
      });
    }
  }
}
