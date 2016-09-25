/// <reference path="IModule.ts" />

interface Window {
  module: mamejs.IModule
  JSMESS: JSMESS
  mozRequestAnimationFrame: any
  webkitRequestAnimationFrame: any
  mozCancelRequestAnimationFrame: any
  webkitCancelRequestAnimationFrame: any
  cancelRequestAnimationFrame: any
}

// shortcut for requestAnimationFrame
namespace mamejs {
  export var raf = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;
  export var craf = window.mozCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.cancelRequestAnimationFrame;
}

interface JSMESS {
  ready?: {(callback: any): void}
}

window.JSMESS = window.JSMESS || {};
window.JSMESS.ready = function (f) { f(); };
