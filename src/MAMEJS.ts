/// <reference path="model/IModule.ts" />
/// <reference path="model/IGame.ts" />
/// <reference path="control/Controls.ts" />
/// <reference path="helper/HTMLHelper.ts" />
/// <reference path="helper/FileLoader.ts" />
/// <reference path="helper/FileSystem.ts" />
/// <reference path="model/Window.ts" />

interface CSSStyleDeclaration {
  imageRendering: string
}
namespace mamejs {
  /**
   * The default template will be inject after compilation, or override by mame config
   */
  declare var template: string

  export function run(config: IConfig, container: HTMLElement): Promise<MAMEJS> {
    let scope: Window = container.ownerDocument.defaultView || container.ownerDocument.parentWindow
    return Mame.load(config.emulator)
  }

  export function runMame(game: IGame,  container: HTMLElement): Promise<MAMEJS> {
    // Fetch game files, they are needed into the emscripten FS at runtime
    return helper.FileLoader.loadFiles(game.files).then((files: Array<IFile>): Promise<HTMLScriptElement> => {

      // Init Emscripten module
      window.Module = {
        arguments: [
          game.driver,
          '-verbose',
          '-window',
          '-rompath',
          MAMEJS.ROM_PATH,
          '-resolution',
          [game.resolution.width, game.resolution.height].join('x'),
          '-samplerate',
          '48000',
        ],
        screenIsReadOnly: true,
        print: function (text: string) {
          console.log('MAME - ' + text);
        },
        canvas: document.createElement('canvas'),
        noInitialRun: false,
        preInit: () => helper.FileSystem.init(MAMEJS.ROM_PATH, files),
        requestFullScreen: function() {}
      }

      container.appendChild(window.Module.canvas)

      return helper.HTMLHelper.loadScript(document, game.emulator)

    }).then((script: HTMLScriptElement): MAMEJS => {
      return new MAMEJS(window.Module, game)
    })
  }

  export class MAMEJS {
    private mameContainer: HTMLIFrameElement

    private mame: Mame

    constructor(private config: IConfig, private container: HTMLElement) {
      if (config.autostart) {
        this.start()
      }
    }

    public start() {
      // Build inject
      this.mameContainer = helper.HTMLHelper.createIframe()
      this.mameContainer.contentWindow.document.write(btoa(template))
      this.mameContainer.contentWindow.document.close()

    }

    private showRunScreen() {

    }

    private showProgressScreen() {

    }


  }
}
