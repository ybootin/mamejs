 /// <reference path="../typings/FS.d.ts" />
/// <reference path="model/IModule.ts" />
/// <reference path="helper/HTMLHelper.ts" />
/// <reference path="model/IGame.ts" />
/// <reference path="model/Window.ts" />
/// <reference path="constant/Common.ts" />
/// <reference path="MAMEJS.ts" />

 namespace mamejs {
  export function loadGame(game: IGame, display: HTMLCanvasElement): Promise<MAMEJS> {
    return Promise.all(Object.keys(game.files).map((romName: string): Promise<IFile> => {
      // fetch file, and update game data
      return helper.HTMLHelper.fetchFile(game.files[romName]).then(function(data: ArrayBuffer): IFile {
        return {
          url: game.files[romName],
          mountpoint: romName,
          data: data
        }
      })
    })).then(function(data: IFile[]): Promise<MAMEJS> {
      game.data = data
      return runMame(game, display)
    })
  }

  export function runMame(game: IGame,  display: HTMLCanvasElement): Promise<MAMEJS> {
    // Init Emscripten module
    window.Module = {
      arguments: getMameArguments(game),
      screenIsReadOnly: true,
      print: function (text: string) {
        console.log('MAME - ' + text);
      },
      canvas: display,
      noInitialRun: false,
      preInit: function () {
        FS.mkdir(Common.ROM_PATH);
        FS.mount(MEMFS, {root: '/'}, Common.ROM_PATH);

        game.data.forEach((file: IFile): void => {
          FS.writeFile(Common.ROM_PATH + '/' + file.mountpoint, new Uint8Array(file.data), {
            encoding: 'binary'
          })
        })
      },
      requestFullScreen: function() {}
    }

    // Load emulator
    return helper.HTMLHelper.loadScript(document, game.emulator).then(function(script: HTMLScriptElement): MAMEJS {
      return new MAMEJS(window.Module, game)
    });
  }

  export function getMameArguments(game: IGame): Array<string> {
    return [
      game.driver,
      '-verbose',
      '-window',
      '-rompath',
      Common.ROM_PATH,
      '-resolution',
      [game.resolution.width, game.resolution.height].join('x'),
      '-samplerate',
      '48000',
    ];
  }
}
