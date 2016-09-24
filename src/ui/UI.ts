namespace mamejs.ui {

  export function render(config: IConfig, container: HTMLElement, template?: string): void {
    template = template || btoa(mamejs.template)

    let mameContainer = helper.HTMLHelper.createIframe()
    let doc = mameContainer.contentWindow.document
    doc.write(template)
    doc.close()

    let playScreen: HTMLElement
    let uploadScreen: HTMLElement
    let progressScreen: HTMLElement
    let errorScreen: HTMLElement

    let canvas = doc.getElementById('canvas')
    let scope: Window = container.ownerDocument.defaultView || container.ownerDocument.parentWindow
    let stdout = new stdout.DefaultStdout(scope, canvas)

    let showHideProgressScreen = (show: boolean) => progressScreen.style.display = show ? 'block' : 'none'
    let showHideErrorScreen = (show: boolean) => ErrorScreen.style.display = show ? 'block' : 'none'
    let showHidePlayScreen = (show: boolean) => PlayScreen.style.display = show ? 'block' : 'none'
    let showHideUploadScreen = (show: boolean) => UploadScreen.style.display = show ? 'block' : 'none'

    let progressHandler = function(filename: string, evt: ProgressEvent): void {
      if (evt.lengthComputable) {
        progressBar.style.width = (evt.loaded / evt.total * 100) + '%'
      }
    }

    let onError = function(error?: MameError) {
      // parse std error and catch error
      error = error || Mame.parseError(stdout)

      showHideErrorScreen(true)
    }

    let loadMame = (): Promise<Mame> => {
      return Mame.load(config.emulator, stdout)
    }

    let loadfiles = () => {
      showHideProgressScreen(true)

      let files = Object.keys(config.game.files)
      let index = 0
      // load file per file to handle progress
      let uploadRecursive = () => {
        if (files[index]) {
          helper.FileLoader.loadFile(config.game.files[files[index]], files[index], (evt) => progressHandler(files[index], evt)).then(() => {
            index++
            uploadRecursive()
          })
        } else {
          // load emulator
          loadMame(function(mame: Mame) => {
            mame.module.addOnExit(() => onError())
            showHideProgressScreen(false)
          })
        }
      }
    }

    playScreen.addEventListener('click', (evt: Event) => {
      // load all and show progress
      showHideStartScreen(false)

      loadFiles()
    })

    let handleUpload = () => {
      // ok, show progress and start upload

      // ko, show error
    }

    if (this.config.game) {
      if (this.config.autostart) {
        showProgressScreen()
      } else {
        showPlayScreen()
      }
    } else {
      showUploadScreen()
    }
  }
}
