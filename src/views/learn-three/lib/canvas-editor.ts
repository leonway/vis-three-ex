export class CanvasEditor {
   canvas:HTMLCanvasElement
  /**
   *
   */
  constructor(width:number=512,height:number=512,bgColor:string='rgb(255,255,255)') {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.style.backgroundColor = bgColor
    this.canvas = canvas
  }

  draw(func:(ctx:CanvasRenderingContext2D)=>void):this{
    const ctx = this.canvas.getContext('2d')
    if(ctx){
      func(ctx)
    }else{
      console.warn('your browser can not support canvas 2d');
    }
    return this
  }

  preview():this{
    const canvas = this.canvas
    canvas.style.position = 'fixed'
    canvas.style.top = '5%'
    canvas.style.left = '5%'
    document.body.appendChild(this.canvas)
    return this
  }
}

