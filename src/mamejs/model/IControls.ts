namespace mamejs {
  export interface IControls {
    player1: IControl
    player2: IControl
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
    pressAndRelease(): void
  }

  export interface IControlMapping {
    start: string
    coin: string
    up: string
    right: string
    down: string
    left: string
    button1: string
    button2: string
    button3: string
    button4: string
    button5: string
    button6: string
  }
}
