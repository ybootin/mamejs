/// <reference path="IModule.ts" />
/// <reference path="FS.d.ts" />

interface Window {
  Module: mamejs.IModule
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
