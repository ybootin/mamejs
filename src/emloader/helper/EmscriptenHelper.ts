/// <reference path="../model/IModule.ts" />
/// <reference path="./HTMLHelper.ts" />

namespace emloader.helper {

  export class EmscriptenHelper {
    static simulateKeyEvent(module: IModule, eventType: string, keyCode: number, charCode: number) {
      return EmscriptenHelper.simulateEvent(module, eventType, {
        keyCode: keyCode,
        witch: keyCode,
        charCode: charCode
      })
    }

    static simulateEvent(module: IModule, eventType: string, data: any = {}) {
      let scope = HTMLHelper.getWindow(module.canvas)
      let e = (<any>scope).document.createEventObject ? (<any>scope).document.createEventObject() : scope.document.createEvent("Events");
      if (e.initEvent) e.initEvent(eventType, true, true);

      for (var att in data) {
        if (data.hasOwnProperty(att) && e[att] === undefined) {
          e[att] = data[att]
        }
      }

      // Dispatch to browser for real (use this if page uses SDL or something else for event handling):
      module.canvas.dispatchEvent ? module.canvas.dispatchEvent(e) : (<any>module).canvas.fireEvent("on" + eventType, e);
    }
  }
}
