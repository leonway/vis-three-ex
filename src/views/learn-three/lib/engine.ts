import {AmbientLight, AxesHelper, BoxGeometry, GridHelper, Mesh, MeshStandardMaterial, MOUSE, Object3D, PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import {EventManager} from './event-manager'

const keyToModeMap:Record<string,'scale'|'rotate'|'translate'> = {
  'e':'scale',
  'r':'rotate',
  't':'translate'
}

class Engine {

  private dom:HTMLDivElement

  private renderer:WebGLRenderer
  private transformControls:TransformControls
  private scene:Scene
  private camera:PerspectiveCamera
  private orbitControls:OrbitControls
  private eventManager:EventManager
  
  /**
   *
   */
  constructor(dom:HTMLDivElement) {

    const renderer = new WebGLRenderer({antialias:true})
    renderer.setSize(dom.offsetWidth,dom.offsetHeight,true)
    renderer.shadowMap.enabled=true

    const camera = new PerspectiveCamera(45,dom.offsetWidth/dom.offsetHeight,1,1000)
    camera.position.set(100,100,100)
    camera.lookAt(new Vector3(0,0,0))
    camera.up = new Vector3(0,1,0)
  
    const scene = new Scene()
 
    const stats:Stats = Stats()
    const statsDom = stats.domElement
    statsDom.style.position = 'fixed'
    statsDom.style.top = '0'
    statsDom.style.right = '5px'
    statsDom.style.left = 'unset'
  
    // this.renderer.setClearColor("rgb(255,255,255)")
    // this.renderer.clearColor()

    const orbitControls:OrbitControls  = new OrbitControls(camera,renderer.domElement)
    // orbitControls.autoRotate = true
    // orbitControls.autoRotateSpeed = 0.3
    // orbitControls.enableDamping = true
    orbitControls.mouseButtons = {
      LEFT:null as unknown as MOUSE,
      MIDDLE:MOUSE.DOLLY,
      RIGHT:MOUSE.ROTATE
    }

    // 变换控制器
    const transformControls = new TransformControls(camera,renderer.domElement)
    scene.add(transformControls)
   

    let transing = false
    transformControls.addEventListener('mouseDown',()=>{
      transing=true
    })

    document.addEventListener('keyup',e=>{
      if(keyToModeMap[e?.key]){
        transformControls.mode = keyToModeMap[e?.key]
      }
    })


    const eventManager = new EventManager({
      dom:renderer.domElement,
      scene,
      camera
    })

    let cacheObject:Mesh|null = null;

    eventManager.addEventListener('mousemove',(event)=>{
      if (event.intersection.length) {
        const object = event.intersection[0].object;

        // 对比新老物体
        if (object === cacheObject) {
          return;
        } else if (object !== cacheObject && cacheObject) {
          (cacheObject.material as MeshStandardMaterial).color.multiplyScalar(
            0.5
          );
        }

        if (object.material) {
          object.material.color.multiplyScalar(2);
          cacheObject = object;
        }
      } else {
        if (cacheObject) {
          (cacheObject.material as MeshStandardMaterial).color.multiplyScalar(
            0.5
          );
          cacheObject = null;
        }
      }
    })

    renderer.domElement.addEventListener("click", (event) => {
      // 拖动结束的操作
      if (transing) {
        transing = false;
        return false;
      }

      // // 选取物体的操作
      // raycaster.setFromCamera(mouse, this.camera)

      // scene.remove(transformControls)
      // const intersection = raycaster.intersectObjects(scene.children)

      // if (intersection.length) {
      //  const object = intersection[0].object
      //  scene.add(transformControls)
      //  transformControls.attach(object)
      // }
    });

    const renderFunc = ()=>{
      orbitControls.update()
      renderer.render(scene,camera)
      stats.update()
      requestAnimationFrame(renderFunc)
    }

    renderFunc()

    dom.appendChild(renderer.domElement)
    dom.appendChild(statsDom)

    this.dom = dom
    this.renderer = renderer
    this.scene = scene
    this.camera = camera
    this.orbitControls = orbitControls
    this.transformControls = transformControls 
    this.eventManager = eventManager
  }

  addObject(...object:Object3D[]){
    object.forEach(elem=>{
      this.scene.add(elem)
    })
  }
}

export default Engine
