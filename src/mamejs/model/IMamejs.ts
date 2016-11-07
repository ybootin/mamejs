namespace mamejs {
  export interface load {
    (emulatorUrl: string, container: HTMLElement): Promise<IMame>
  }

  export interface run {
    (): Promise<IMame>
  }

  export interface controllers: IControllers
}
