interface CSSStyleDeclaration {
  imageRendering: string
}
namespace mamejs {
  export class MAMEJS {

    constructor(private module: IModule, private game: IGame) {
      this.resize(game.resolution.width, game.resolution.height)
    }

    public resize(width: number, height: number): void {
      this.module.canvas.style.imageRendering = '-moz-crisp-edges'
      this.module.canvas.style.imageRendering = '-o-crisp-edges'
      this.module.canvas.style.imageRendering = '-webkit-optimize-contrast'
      this.module.canvas.style.imageRendering = 'optimize-contrast'
      this.module.canvas.style.imageRendering = 'crisp-edges'
      this.module.canvas.style.imageRendering = 'pixelated'
      this.module.canvas.style.imageRendering = 'optimizeSpeed'

      this.module.canvas.style.width = width + 'px'
      this.module.canvas.style.height = height + 'px'
      this.module.canvas.width = width
      this.module.canvas.height = height
    }
  }
}
