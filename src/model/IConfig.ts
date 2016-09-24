namespace mamejs {
  export interface IConfig {
    /**
     * Emulator URL
     */
    emulator: string

    /**
     * screen resolution
     */
    resolution?: IResolution

    /**
     * the game to load ;)
     * if missing, upload screen displayed if not setted
     */
    game?: IGame

    /**
     * Background image
     */
    splashcreen?: string

    /**
     * autostart emulator, play button displayed if not setted
     */
     autostart?: boolean

     /**
      * override default template
      * base64 string
      */
     template?: string

     /**
      * mute sound at startup
      */
      muted?: string

  }
}
