namespace mamejs.helper {
  export class FileLoader {

    static loadFiles(files: {[filename: string]: string}, handler?: {(evt: ProgressEvent): void}): Promise<IFile[]> {
      return Promise.all(Object.keys(files).map((name: string): Promise<IFile> => {
        return FileLoader.loadFile(files[name], name, handler)
      }))
    }

    static loadFile(url: string, name: string, handler?: {(evt: ProgressEvent): void}): Promise<IFile> {
      // fetch file, and update game data
      return FileLoader.fetchFile(url, 'arraybuffer', handler).then(function(data: ArrayBuffer): IFile {
        return {
          url: url,
          name: name,
          data: new Uint8Array(data)
        }
      })
    }

    // XHR file loader
    static fetchFile(url: string, responseType: string = 'arraybuffer', handler?: {(evt: ProgressEvent): void}): Promise<ArrayBuffer> {
      return new Promise(function (resolve, reject): void {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = responseType;

        let errorMsg: string = 'error loading ' + url

        // register Handler callback for all ProgressEvent
        if (handler && typeof handler === 'function') {
          ['progress', 'load', 'error', 'abort'].forEach((eventName: string): void => {
            xhr.addEventListener(eventName, handler)
          })
        }

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
