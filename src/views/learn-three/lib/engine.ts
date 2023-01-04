import {AmbientLight, AxesHelper, BoxGeometry, GridHelper, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

    const renderer = new WebGLRenderer()
    renderer.setSize(dom.offsetWidth,dom.offsetHeight,true)

    const camera = new PerspectiveCamera(45,dom.offsetWidth/dom.offsetHeight)
    camera.position.set(200,200,200)
    camera.lookAt(new Vector3(0,0,0))
    camera.up = new Vector3(0,1,0)

    const orbitControls:OrbitControls  = new OrbitControls(camera,renderer.domElement)
   
    const box: Mesh = new Mesh(
      new BoxGeometry(50,50,50),
      new MeshStandardMaterial({
        color:'rgb(255,0,0)'
      })
    )

    const scene = new Scene()
 
    const ambientLight:AmbientLight = new AmbientLight('rgb(255,255,255)',1)

    const axeshelper:AxesHelper  = new AxesHelper(400)
    const gridHelper:GridHelper  = new GridHelper(400,30)
  

    // this.renderer.setClearColor("rgb(255,255,255)")
    // this.renderer.clearColor()

    scene.add(box)
    scene.add(ambientLight)
    scene.add(axeshelper)
    scene.add(gridHelper)


    const renderFunc = ()=>{
      box.position.x+=-0.1
      box.position.y+=0.1
      camera.position.x+=-0.1
      renderer.render(scene,camera)
      requestAnimationFrame(renderFunc)
    }

    renderFunc()

    dom.appendChild(renderer.domElement)

    this.dom = dom
    this.renderer = renderer
    this.scene = scene
    this.camera = camera
    this.orbitControls = orbitControls
  }
}

export default Engine
