/// <reference path="IControls.ts" />

namespace mamejs {
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
