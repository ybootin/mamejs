namespace mamejs {
  export class Mame {
    static ROM_PATH: string = '/roms'

    static load(url: string, stdout: stdout.IStdout, files: Array<IFile> = [], module: IModule = null): Promise<Mame> {
      scope.module = module || Mame.getDefaultModule(stdout, files)

      return helper.HTMLHelper.loadScript(stdout.scope.document, game.emulator).then((): IModule => {
        return new Mame(scope.module)
      })
    }

    static run(module: IModule, arguments: Array<string> = []): void {
      module.callMain(arguments)
    }

    static parseStderr(stderr: Array<string>): void {
      // @todo, search for proposal drivers into stderr when a game fail to load
    }

    static getDefaultModule(stdout: IStdout: IModule, files: Array<IFile> = []) {
      return {
        arguments: [],
        screenIsReadOnly: true,
        print: function (text: string): void {
          stdout.print(text)
        },
        printErr: function(error: string): void {
          stdout.printErr(error)
        },
        canvas: stdout.canvas,
        noInitialRun: true,
        preInit: () => helper.FileSystem.init(Mame.ROM_PATH, files),
      }
    }

    private _controls: control.Controls

    constructor(private module: IModule) {
      this._controls = new control.Controls(module)
    }

    public get controls(): control.Controls {
      return this._controls
    }
  }
}
