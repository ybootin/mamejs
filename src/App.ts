/// <reference path="model/IConfig.ts" />
/// <reference path="helper/FileLoader.ts" />
/// <reference path="model/Window.ts" />
/// <reference path="Mame.ts" />

namespace mamejs {
  export var template: string = '%MAMEJSTEMPLATE%'

  export function run(config: IConfig, container: HTMLElement) {
    let tmpl = config.template || atob(template)

    let baseContainer = document.createElement('div')
    baseContainer.style.width = (config.resolution ? config.resolution.width : Mame.DEFAULT_RESOLUTION.width) + 'px'
    baseContainer.style.height = (config.resolution ? config.resolution.height : Mame.DEFAULT_RESOLUTION.height) + 'px'
    container.appendChild(baseContainer)

    let mameContainer = helper.HTMLHelper.createIframe()
    mameContainer.style.width = (config.resolution ? config.resolution.width : Mame.DEFAULT_RESOLUTION.width) + 'px'
    mameContainer.style.height = (config.resolution ? config.resolution.height : Mame.DEFAULT_RESOLUTION.height) + 'px'
    baseContainer.appendChild(mameContainer)

    let doc = mameContainer.contentWindow.document
    doc.write(tmpl)
    doc.close()

    let playScreen: HTMLElement = doc.getElementById('play-screen')
    let uploadScreen: HTMLElement = doc.getElementById('upload-screen')
    let progressScreen: HTMLElement = doc.getElementById('progress-screen')
    let errorScreen: HTMLElement = doc.getElementById('error-screen')
    let gameScreen: HTMLElement = doc.getElementById('game-screen')

    let canvas = <HTMLCanvasElement>doc.getElementById('canvas')
    let scope: Window = container.ownerDocument.defaultView || (<any>container.ownerDocument).parentWindow
    let stdout = new mamejs.stdout.DefaultStdout(scope, canvas)

    let showHideProgressScreen = (show: boolean) => progressScreen.style.display = show ? 'block' : 'none'
    let showHideErrorScreen = (show: boolean) => errorScreen.style.display = show ? 'block' : 'none'
    let showHidePlayScreen = (show: boolean) => playScreen.style.display = show ? 'block' : 'none'
    let showHideUploadScreen = (show: boolean) => uploadScreen.style.display = show ? 'block' : 'none'
    let showHideGameScreen = (show: boolean) => gameScreen.style.display = show ? 'block' : 'none'

    let progressBar = doc.getElementById('progress-bar')

    let progressHandler = function(evt: ProgressEvent): void {
      if (evt.lengthComputable) {
        progressBar.style.width = (evt.loaded / evt.total * 100) + '%'
      }
    }

    let onError = function(error?) {
      // parse std error and catch error
      error = error || Mame.parseStderr(stdout)

      showHideErrorScreen(true)
    }

    let loadMame = (files: Array<IFile>): Promise<Mame> => {
      return Mame.load(config.emulator, stdout, files)
    }

    playScreen.addEventListener('click', (evt: Event) => {
      // load all and show progress
      showHidePlayScreen(false)
      showHideProgressScreen(true)

      helper.FileLoader.loadFilesOneByOne(config.game.files, progressHandler).then(function(files: Array<IFile>) {
        return loadMame(files)
      }).then(function(mame: Mame) {
        mame.module.addOnExit(() => onError())

        Mame.run(mame.module, Mame.getGameArgs(config.game.driver))

        showHideProgressScreen(false)
        showHideGameScreen(true)
      })
    })

    let handleUpload = () => {
      // ok, show progress and start upload

      // ko, show error
    }

    if (config.game) {
      if (config.autostart) {
        showHideProgressScreen(true)
      } else {
        showHidePlayScreen(true)
      }
    } else {
      showHideUploadScreen(true)
    }
  }
}
