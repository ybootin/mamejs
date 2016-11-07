namespace mamejs {
  export interface IMameKeyHandler {
    on(event: string, callback: Function): void
    off(event: string, callback: Function): void

    pressMameKey(mameKey: string): void
    releaseMameKey(mameKey: string): void
  }
}
