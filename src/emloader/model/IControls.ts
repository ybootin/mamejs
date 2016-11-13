namespace emloader {
  export interface IControlMapping {
    start: number
    coin: number
    up: number
    right: number
    down: number
    left: number
    button1: number
    button2: number
    button3: number
    button4: number
    button5: number
    button6: number
  }

  export interface IControlKeyHandler {
    on(event: string, callback: {(keyCode: number): void}): void
    off(event: string, callback: {(keyCode: number): void}): void

    pressKey(keyCode: number): void
    releaseKey(keyCode: number): void
  }

  export interface IJoystick {
    setControlMapping(controlMapping: IControlMapping): void
    getControlMapping(): IControlMapping

    setKeyHandler(handler: IControlKeyHandler): void
    getKeyHandler(): IControlKeyHandler

    connect(gamepad: Gamepad): void
    disconnect(): void

    isConnected(): boolean

    getGamepad(): Gamepad

    getButtonMap(): Array<string>
    setButtonMap(buttonMap: Array<string>): void
  }
}
