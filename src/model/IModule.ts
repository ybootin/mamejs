namespace mamejs {
  export interface IModule {
    arguments: Array<string>
    screenIsReadOnly: boolean
    print: Function
    canvas: HTMLCanvasElement
    noInitialRun: boolean
    preInit: Function
    requestFullScreen: Function

    _SDL_SendKeyboardKey?: IModule_SDL_SendKeyboardKey
  }

  export interface IModule_SDL_SendKeyboardKey {
    (state: number, scancode: number): void
  }
}
