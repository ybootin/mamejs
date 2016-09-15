namespace mamejs.helper {
  export class HTMLHelper {

    // append a script to the DOM
    static loadScript(document: Document, url): Promise<HTMLScriptElement> {
      return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.addEventListener("load", function(evt) {
          resolve(script)
        });
        script.addEventListener("error", function(evt) {
          reject(evt)
        });
        script.type = 'text/javascript';
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
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
