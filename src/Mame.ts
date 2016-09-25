/// <reference path="model/IModule.ts" />
/// <reference path="model/IStdout.ts" />
/// <reference path="helper/HTMLHelper.ts" />
/// <reference path="helper/FileSystem.ts" />
/// <reference path="stdout/DefaultStdout.ts" />
/// <reference path="control/Controls.ts" />


namespace mamejs {
  export class Mame {
    static ROM_PATH: string = '/roms'

    static load(url: string, stdout: IStdout, files: Array<IFile> = [], module: IModule = null): Promise<Mame> {
      stdout.scope.module = module || Mame.getDefaultModule(stdout, files)

      return helper.HTMLHelper.loadScript(stdout.scope.document, url).then((): Mame => {
        return new Mame(stdout.scope.module)
      })
    }

    static run(module: IModule, args: Array<string> = []): void {
      module.callMain(args)
    }

    static parseStderr(stderr: any): void {
      // @todo, search for proposal drivers into stderr when a game fail to load
    }

    static getDefaultModule(stdout: IStdout, files: Array<IFile> = []) {
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

    constructor(private _module: IModule) {
      this._controls = new control.Controls(this._module)
    }

    public get controls(): control.Controls {
      return this._controls
    }

    public get module(): IModule {
      return this._module
    }
  }
}
