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

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = window.mozCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame
}


interface JSMESS {
  ready?: {(callback: any): void}
}

window.JSMESS = window.JSMESS || {};
window.JSMESS.ready = function (f) { f(); };
