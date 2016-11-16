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

    static createIframe(doc: Document = window.document): HTMLIFrameElement {

      var iframe: HTMLIFrameElement = <HTMLIFrameElement>doc.createElement('iframe')
      iframe.style.margin = '0px'
      iframe.style.padding = '0px'
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.style.border = '0px'
      iframe.style.overflow = 'hidden'

      iframe.setAttribute('scrolling', 'no')

      iframe.frameBorder = '0'

      return iframe
    }

    static getWindow(element: HTMLElement): Window {
      return element.ownerDocument.defaultView || (<any>element.ownerDocument).parentWindow
    }

    static addClass(element: HTMLElement, className: string): void {
      element.className = element.className + (element.className.split(' ').indexOf(className) === -1 ? ' ' + className : '')
    }

    static removeClass(element: HTMLElement, className: string): void {
      element.className = element.className.split(' ').filter((item: string): boolean => {
        return item !== className
      }).join(' ')
    }
  }
}
