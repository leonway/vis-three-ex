import {AmbientLight, AxesHelper, BoxGeometry, GridHelper, Mesh, MeshStandardMaterial, MOUSE, Object3D, PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import Stats from 'three/examples/jsm/libs/stats.module'

class Engine {

  private dom:HTMLDivElement

  private renderer:WebGLRenderer
  private transformControls:TransformControls
  private scene:Scene
  private camera:PerspectiveCamera
  private orbitControls:OrbitControls
  private raycaster:Raycaster
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

    let transing = false
    // 变换控制器
    const transformControls = new TransformControls(camera,renderer.domElement)
    scene.add(transformControls)
    transformControls.addEventListener('mouseUp',()=>{
      transing=true
    })
    // 射线发射器
    const raycaster = new Raycaster()

    // 给renderer 的canvas 对象添加鼠标事件
    const mouse = new Vector2()
    let x = 0;
    let y = 0;
    let width = 0;
    let height = 0;
    renderer.domElement.addEventListener('mousemove',(event)=>{
      x = event.offsetX
      y = event.offsetY
      width = renderer.domElement.offsetWidth
      height = renderer.domElement.offsetHeight
      mouse.x = x / width * 2 - 1
      mouse.y = -y * 2 / height + 1
    })

    renderer.domElement.addEventListener('click',(event)=>{
      if(transing){
        transing = false
        return false
      }
      raycaster.setFromCamera(mouse,this.camera)
      scene.remove(transformControls)
      const intersection = raycaster.intersectObjects(scene.children,false)
      scene.add(transformControls)
      if(intersection.length){
        console.log('intersection',intersection);
        const object = intersection[0].object
        console.log('object',object);
        
        transformControls.attach(object)
      }
    })

   
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
    this.raycaster = raycaster
  }

  addObject(...object:Object3D[]){
    object.forEach(elem=>{
      this.scene.add(elem)
    })
  }
}

export default Engine
