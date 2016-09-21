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

    static resizeCanvas(canvas: HTMLCanvasElement, width: number, height: number): void {
      canvas.style.imageRendering = '-moz-crisp-edges'
      canvas.style.imageRendering = '-o-crisp-edges'
      canvas.style.imageRendering = '-webkit-optimize-contrast'
      canvas.style.imageRendering = 'optimize-contrast'
      canvas.style.imageRendering = 'crisp-edges'
      canvas.style.imageRendering = 'pixelated'
      canvas.style.imageRendering = 'optimizeSpeed'

      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      canvas.width = width
      canvas.height = height
    }
  }
}
