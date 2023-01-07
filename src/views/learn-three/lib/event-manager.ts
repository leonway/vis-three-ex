import { Camera, EventDispatcher, Object3D, Raycaster, Scene, Vector2 } from "three"

export interface EventManagerParams {
  dom: HTMLCanvasElement
  scene: Scene
  camera: Camera
}

export class EventManager extends EventDispatcher {
  private raycaster = new Raycaster()
  private mouse =  new Vector2()
  private dom: HTMLCanvasElement
  private scene: Scene
  private camera: Camera
  /**
   *
   */
  constructor(params: EventManagerParams) {
    super();
    // 射线发射器
    const raycaster = this.raycaster

    // 给renderer 的canvas 对象添加鼠标事件
    const mouse = this.mouse 
    const dom = this.dom = params.dom
    const scene = this.scene = params.scene
    const camera = this.camera = params.camera

    let cacheObject:Object3D|null = null

    dom.addEventListener('mousedown',(event)=>{
      // 选取物体的操作符
      raycaster.setFromCamera(mouse, this.camera)
      const intersection = raycaster.intersectObjects(scene.children)
      this.dispatchEvent({
        type:"mousedown",
        intersection
      })
      if (intersection.length) {
        const object = intersection[0].object
        object.dispatchEvent({
          type:'mousedown'
        })
      }
    })

    dom.addEventListener('mousemove', (event) => {

      mouse.x = event.offsetX / dom.offsetWidth * 2 - 1
      mouse.y = -event.offsetY * 2 / dom.offsetHeight + 1

        // 选取物体的操作符
      raycaster.setFromCamera(mouse, this.camera)

      const intersection = raycaster.intersectObjects(scene.children)
      this.dispatchEvent({
        type:"mousemove",
        intersection
      })
      if (intersection.length) {

        const object = intersection[0].object
        if (cacheObject !== object) {
          if (cacheObject) {
            cacheObject.dispatchEvent({
              type: 'mouseleave'
            })
          }
          object.dispatchEvent({
            type: 'mouseenter'
          })
        } else {
          object.dispatchEvent({
            type: 'mousemove'
          })
        }
        cacheObject = object
      } else {
        if (cacheObject) {
          cacheObject.dispatchEvent({
            type: 'mouseleave'
          })
        }
        cacheObject = null
      }
    })

    dom.addEventListener('mouseup',(event)=>{
      raycaster.setFromCamera(mouse, this.camera)

      const intersection = raycaster.intersectObjects(scene.children)
      this.dispatchEvent({
        type:"mouseup",
        intersection
      })
      if (intersection.length) {
        const object = intersection[0].object
        object.dispatchEvent({
          type:'mouseup'
        })
      }
    })

    dom.addEventListener('click', (event) => {

      raycaster.setFromCamera(mouse, this.camera)

      const intersection = raycaster.intersectObjects(scene.children)
      this.dispatchEvent({
        type:"click",
        intersection
      })
      if (intersection.length) {
        const object = intersection[0].object
        object.dispatchEvent({
          type:'click'
        })
      }

    })


  }
}
