namespace mamejs {
  export interface IControls {
    player1: IControl
    player2: IControl
    triggerKey(keyCode: number)
  }

  export interface IControl {
    start: IButton
    coin: IButton
    up: IButton
    right: IButton
    down: IButton
    left: IButton
    button1: IButton
    button2: IButton
    button3: IButton
    button4: IButton
    button5: IButton
    button6: IButton
  }

  export interface IButton {
    press(): void
    release(): void
    pressAndRelease(callback?: Function): void
  }

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
}
