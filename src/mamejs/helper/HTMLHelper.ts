namespace mamejs.helper {
  export class HTMLHelper {
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
