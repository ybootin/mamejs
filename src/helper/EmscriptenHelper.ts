/// <reference path="../model/IModule.ts" />
/// <reference path="./HTMLHelper.ts" />

namespace mamejs.helper {

  export class EmscriptenHelper {
    static simulateKeyEvent(module: IModule, eventType: string, keyCode: number, charCode: number) {
      let scope = HTMLHelper.getWindow(module.canvas)
      let e = (<any>scope.document).createEventObject ? (<any>scope.document).createEventObject() : scope.document.createEvent("Events");
      if (e.initEvent) e.initEvent(eventType, true, true);

      e.keyCode = keyCode;
      e.which = keyCode;
      e.charCode = charCode;


      // Dispatch to browser for real (use this if page uses SDL or something else for event handling):
      module.canvas.dispatchEvent ? module.canvas.dispatchEvent(e) : (<any>module.canvas).fireEvent("on" + eventType, e);
    }
  }
}
