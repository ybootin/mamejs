interface CSSStyleDeclaration {
  imageRendering: string
}
namespace mamejs.helper {
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

    static createIframe(): HTMLIFrameElement {

      var iframe: HTMLIFrameElement = <HTMLIFrameElement>document.createElement('iframe')
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

    static addClass(element: HTMLElement, className: string): void {
      if (!HTMLHelper.hasClass(element, className)) {
        element.className += ' ' + className
        element.className = element.className.trim()
      }
    }

    static removeClass(element: HTMLElement, className: string): void {
      if (HTMLHelper.hasClass(element, className)) {
        var classes = element.className.split(' ')
        classes.splice(classes.indexOf(className), 1)

        element.className = classes.join(' ').trim()
      }
    }

    static hasClass(element: HTMLElement, className: string): boolean {
      return element.className.split(' ').indexOf(className) !== -1
    }

    static toggleClass(element: HTMLElement, className: string): void {
      HTMLHelper.hasClass(element, className) ? HTMLHelper.removeClass(element, className) : HTMLHelper.addClass(element, className)
    }

    static replaceClass(element: HTMLElement, newClassName: string, oldClassName: string): void {
      if (!HTMLHelper.hasClass(element, newClassName) && HTMLHelper.hasClass(element, oldClassName)) {
        HTMLHelper.removeClass(element, oldClassName)
        HTMLHelper.addClass(element, newClassName)
      }
    }
  }
}
