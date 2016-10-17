interface CSSStyleDeclaration {
  imageRendering: string
}
namespace emloader.helper {
  export class HTMLHelper {

    // append a script to the DOM
    static loadScript(doc: Document, url): Promise<HTMLScriptElement> {
      return new Promise(function (resolve, reject) {
        var script = doc.createElement('script');
        script.addEventListener("load", function(evt) {
          resolve(script)
        });
        script.addEventListener("error", function(evt) {
          reject(evt)
        });
        script.type = 'text/javascript';
        script.src = url;
        doc.getElementsByTagName('head')[0].appendChild(script);
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

    static createIframe(doc: Document = window.document): HTMLIFrameElement {

      var iframe: HTMLIFrameElement = <HTMLIFrameElement>doc.createElement('iframe')
      iframe.style.margin = '0px'
      iframe.style.padding = '0px'
      iframe.style.width = '0'
      iframe.style.height = '0'
      iframe.style.border = '0px'
      iframe.style.overflow = 'hidden'

      iframe.setAttribute('scrolling', 'no')

      iframe.frameBorder = '0'

      return iframe
    }

    static getWindow(element: HTMLElement): Window {
      return element.ownerDocument.defaultView || (<any>element.ownerDocument).parentWindow
    }
  }
}
