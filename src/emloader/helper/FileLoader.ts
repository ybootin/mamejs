namespace emloader.helper {
  export class FileLoader {
    static toUint8Array = (str: string):Uint8Array => {
      var len = str.length;
      var bytes = new Uint8Array( len );
      for (var i = 0; i < len; i++)        {
          bytes[i] = str.charCodeAt(i);
      }
      return bytes;
    }

    static loadFile(url: string, name: string, handler?: {(evt: ProgressEvent): void}): Promise<IFile> {
      // fetch file, and update game data
      return FileLoader.fetchFile(url, 'arraybuffer', handler).then(function(data: ArrayBuffer): IFile {
        return {
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
          if (xhr.status < 200 || xhr.status >= 400) {
            reject(errorMsg + ' : status code ' + xhr.status);
          } else {
            resolve(<ArrayBuffer>xhr.response);
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
