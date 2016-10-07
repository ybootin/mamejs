/// <reference path="model/IConfig.ts" />
/// <reference path="helper/FileLoader.ts" />
/// <reference path="helper/HTMLHelper.ts" />
/// <reference path="model/Window.ts" />
/// <reference path="Mame.ts" />

namespace mamejs {
  export var template: string = '{{MAMEJSTEMPLATE}}'

  export function run(config: IConfig, container: HTMLElement) {
    let tmpl = config.template || atob(template)

    let baseContainer = document.createElement('div')
    container.appendChild(baseContainer)

    let mameContainer = helper.HTMLHelper.createIframe()
    mameContainer.style.width = (config.resolution ? config.resolution.width : Mame.DEFAULT_RESOLUTION.width) + 'px'
    mameContainer.style.height = (config.resolution ? config.resolution.height : Mame.DEFAULT_RESOLUTION.height) + 'px'
    baseContainer.appendChild(mameContainer)

    let doc = mameContainer.contentWindow.document
    doc.write(tmpl)
    doc.close()

    let appContainer = doc.getElementById('container')
    appContainer.style.width = mameContainer.style.width
    appContainer.style.height = mameContainer.style.height

    let canvas = <HTMLCanvasElement>doc.getElementById('canvas')
    let scope: Window = container.ownerDocument.defaultView || (<any>container.ownerDocument).parentWindow
    let stdout = new mamejs.stdout.DefaultStdout(scope, canvas)

    let playButton = doc.getElementById('play-button')
    let progressBar = doc.getElementById('progress-bar')
    let progressText = doc.getElementById('progress-text')
    let errorContent = doc.getElementById('error-content')

    let status = {
      UNSTARTED: 'unstarted',
      LOADING: 'loading',
      PLAYING: 'playing',
      ERROR: 'error',
    }

    let setStatus = (st: string) => {
      for (var index in status) {
        helper.HTMLHelper.removeClass(appContainer, status[index])
      }
      helper.HTMLHelper.addClass(appContainer, st)
    }

    let progressHandler = function(evt: ProgressEvent): void {
      if (evt.lengthComputable) {
        progressBar.style.width = (evt.loaded / evt.total * 100) + '%'
      }
    }

    let handleError = function(error?) {
      setStatus(status.ERROR)

      // parse std error and catch error
      error = error || Mame.parseStderr(stdout)

      errorContent.innerHTML = stdout.stderr.join("\n") + "\n" + error
    }

    let loadMame = (files: Array<IFile>): Promise<Mame> => {
      return Mame.load(config.emulator, stdout, files)
    }

    let handlePlay = (evt?: Event) => {
      setStatus(status.LOADING)
      helper.FileLoader.loadFilesOneByOne(config.game.files, progressHandler).then(function(files: Array<IFile>) {
        return loadMame(files)
      }).then(function(mame: Mame) {
        mame.module.addOnExit(() => handleError())

        Mame.run(mame.module, Mame.getGameArgs(config.game.driver, config.resolution))
        setStatus(status.PLAYING)
      }).catch((error: string) => {
        handleError(error)
      })
    }

    playButton.addEventListener('click', handlePlay)

    // run !
    if (config.game) {
      if (config.autostart) {
        handlePlay()
      } else {
        setStatus(status.UNSTARTED)
      }
    } else {
      handleError('no game provided')
    }
  }
}
