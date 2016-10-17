/// <reference path="IModule.ts" />

interface Window {
  Module: emloader.IModule
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
