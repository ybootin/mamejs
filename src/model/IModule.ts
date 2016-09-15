namespace mamejs {
  export interface IModule {
    arguments: Array<string>
    screenIsReadOnly: boolean
    print: Function
    canvas: HTMLCanvasElement
    noInitialRun: boolean
    preInit: Function
    requestFullScreen: Function
  }
}
