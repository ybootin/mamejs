interface Window {
  JSMESS: JSMESS
}


interface JSMESS {
  ready?: {(callback: any): void}
}

window.JSMESS = window.JSMESS || {};
window.JSMESS.ready = function (f) { f(); };
