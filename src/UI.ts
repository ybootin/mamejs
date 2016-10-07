/// <reference path="model/IConfig.ts" />
/// <reference path="helper/FileLoader.ts" />
/// <reference path="helper/HTMLHelper.ts" />
/// <reference path="model/Window.ts" />
/// <reference path="mame/Mame.ts" />
/// <reference path="mame/stdout.ts" />

namespace mamejs {
  export var template: string = '{{MAMEJSTEMPLATE}}'

  export class UI {
    private isRendered: boolean = false

    constructor(private mamejs: MameJS, private template: string, private container: HTMLElement) {}

    public render(): boolean {
      if (this.isRendered) {
        return false
      }
      this.isRendered = true

      let baseContainer = document.createElement('div')
      baseContainer.style.position = 'relative'
      container.appendChild(baseContainer)

      let mameContainer = helper.HTMLHelper.createIframe()
      let doc = mameContainer.contentWindow.document
      doc.write(this.template)
      doc.close()

      baseContainer.appendChild(mameContainer)

      let appContainer = doc.getElementById('container')

      let canvas = <HTMLCanvasElement>doc.getElementById('canvas')
      let scope: Window = container.ownerDocument.defaultView || (<any>container.ownerDocument).parentWindow
      let stdout = new mame.Stdout(scope, canvas)

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

      setStatus(status.UNSTARTED)


      this.mamejs.on(event.MameJS.FILES_LOAD_START, () => {
        setStatus(status.LOADING)
      })

      this.mamejs.on(event.MameJS.FILES_LOADED, () => {
        setStatus(status.PLAYING)
      })

      this.mamejs.on(event.MameJS.SIZE_CHANGE, () => {
        appContainer.style.width = mamejs.getWidth() + 'px'
        appContainer.style.height = mamejs.getHeight() + 'px'
      })

      this.mamejs.on(event.MameJS.ERROR, (error) => {
        setStatus(status.ERROR)

        // parse std error and catch error
        error = error || Mame.parseStderr(stdout)

        errorContent.innerHTML = stdout.stderr.join("\n") + "\n" + error
      })

      this.mamejs.on(event.MameJS.FILE_PROGRESS, (data: IProgressData) => {
        if (data.event.lengthComputable) {
          progressBar.style.width = (event.loaded / event.total * 100) + '%'
        }
      })

      playButton.addEventListener('click', () => mamejs.runMame())
    }
  }
}
