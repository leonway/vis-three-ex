import {AmbientLight, AxesHelper, BoxGeometry, GridHelper, Mesh, MeshStandardMaterial, MOUSE, Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

class Engine {

  private dom:HTMLDivElement

  private renderer:WebGLRenderer
  private scene:Scene
  private camera:PerspectiveCamera
  private orbitControls:OrbitControls
  /**
   *
   */
  constructor(dom:HTMLDivElement) {

    const renderer = new WebGLRenderer({antialias:true})
    renderer.setSize(dom.offsetWidth,dom.offsetHeight,true)

    const camera = new PerspectiveCamera(45,dom.offsetWidth/dom.offsetHeight,1,1000)
    camera.position.set(100,100,100)
    camera.lookAt(new Vector3(0,0,0))
    camera.up = new Vector3(0,1,0)
   
   

    const scene = new Scene()
 

    const axeshelper:AxesHelper  = new AxesHelper(500)
    const gridHelper:GridHelper  = new GridHelper(500,20,'rgb(200,200,200)','rgb(100,100,100)')

    scene.add(axeshelper)
    scene.add(gridHelper)

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
  }

  addObject(...object:Object3D[]){
    object.forEach(elem=>{
      this.scene.add(elem)
    })
  }
}

export default Engine
