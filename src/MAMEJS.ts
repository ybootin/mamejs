/// <reference path="model/IModule.ts" />
/// <reference path="model/IGame.ts" />
/// <reference path="control/Controls.ts" />
/// <reference path="helper/HTMLHelper.ts" />
/// <reference path="helper/BinaryLoader.ts" />
/// <reference path="helper/FileSystem.ts" />
/// <reference path="model/Window.ts" />

interface CSSStyleDeclaration {
  imageRendering: string
}
namespace mamejs {

  export function runMame(game: IGame,  container: HTMLElement): Promise<MAMEJS> {
    // Fetch game files, they are needed into the emscripten FS at runtime
    return helper.BinaryLoader.loadFiles(game.files).then((files: Array<IFile>): Promise<HTMLScriptElement> => {
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
    static ROM_PATH: string = '/roms'

    private _controls: control.Controls

    constructor(private module: IModule, private game: IGame) {
      this.resize(game.resolution.width, game.resolution.height)

      this._controls = new control.Controls(module)
    }

    public get controls(): control.Controls {
      return this._controls
    }

    public resize(width: number, height: number): void {
      helper.HTMLHelper.resizeCanvas(this.module.canvas, width, height)
    }
  }
}
