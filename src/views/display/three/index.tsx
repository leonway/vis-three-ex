import React,{ memo,useRef,useCallback } from 'react'
import {useMount,useCreation} from 'ahooks'
import { Quaternion,Mesh,AmbientLight, BoxGeometry, CubeTextureLoader, DirectionalLight, MeshStandardMaterial, PerspectiveCamera, ReinhardToneMapping, Scene, Vector3, WebGLRenderer, Euler ,BufferGeometry, TextureLoader, Clock} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {OBJLoader} from 'three/examples/jsm/loaders/ObjLoader'
import s from './index.module.css'
interface ModalCreatedByThreeProps {}

const transfromAnchor = function (geometry:BufferGeometry,config) {
  geometry.center();
  geometry.computeBoundingBox()

  const box = geometry.boundingBox;
  const position = config.position
  const rotation = config.rotation
  const scale = config.scale

  // 先应用旋转缩放
  const quaternion = new Quaternion().setFromEuler(
    new Euler(rotation.x,rotation.y,rotation.z,"XYZ")
  )

  // 在应用缩放
  geometry.applyQuaternion(quaternion)
  geometry.scale(scale.x,scale.y,scale.z)

  // 计算位置
  geometry.center()
  geometry.computeBoundingBox()

  // 根据旋转缩放运算位置
  geometry.translate(
    ((box.max.x - box.min.x) / 2) * position.x,
    ((box.max.y - box.min.y) / 2) * position.y,
    ((box.max.z - box.min.z) / 2) * position.z,
  )

  return geometry
}

const ModalCreatedByThree: React.FC<ModalCreatedByThreeProps> = componentProps => {
  const renderer = useCreation<WebGLRenderer>(()=>{
    const tmp = new WebGLRenderer({
      antialias:true
     })
    tmp.physicallyCorrectLights=true //开启物理光照
    tmp.toneMapping = ReinhardToneMapping //
    tmp.toneMappingExposure = 3 //曝光
    tmp.shadowMap.enabled = true // 开启阴影
    return tmp
  } ,[])
  const scene = useCreation<Scene>(()=>new Scene(),[])
  const cubeTextureLoader = useCreation<CubeTextureLoader>(()=>new CubeTextureLoader(),[])
  const textureLoader = useCreation<TextureLoader>(()=>new TextureLoader(),[])
  const clock = useCreation<Clock>(()=>new Clock(),[])
  let visObj = useCreation<Mesh|undefined>(()=>undefined,[])
  let threeObj = useCreation<Mesh|undefined>(()=>undefined,[])

  let timer = useCreation<number|undefined>(()=>undefined,[])

  const objLoader = useCreation<OBJLoader>(()=>{
    const loader = new OBJLoader()
    loader.loadAsync('/resource/vis.obj').then(group=>{
      // scene.add(group)
      const obj = group.children[0]
      const geometry = obj.geometry;

      transfromAnchor(geometry,{
        rotation:{
          x:0,
          y:0,
          z:0
        },
        position:{
          x:0,
          y:0,
          z:0
        },
        scale:{
          x:6,
          y:6,
          z:6
        }
      })

      const map = textureLoader.load('/resource/vis-color-map.png')
      const material = new MeshStandardMaterial({
        metalness:1,
        roughness:0,
        transparent:true,
        opacity:0.8,
        map
      })

      obj.material.dispose()
      obj.material = material

      scene.add(obj)
      visObj = obj
    })
    loader.loadAsync('/resource/three.obj').then(group=>{
      // scene.add(group)
      const obj = group.children[0]
      const geometry = obj.geometry;
    
      transfromAnchor(geometry,{
        rotation:{
          x:Math.PI/2,
          y:-(Math.PI/180)*30,
          z:0
        },
        position:{
          x:0.13,
          y:-0.14,
          z:0
        },
        scale:{
          x:80,
          y:80,
          z:80
        }
      })

      const material = new MeshStandardMaterial({
        metalness:1,
        roughness:0,
        color:'white',
        envMapIntensity:0.8
      })

      obj.material.dispose()
      obj.material = material

      scene.add(obj)
      threeObj = obj
    })
    return loader 
  },[])
 
  const sceneTexture = useCreation(()=>cubeTextureLoader.setPath('/resource/').load([
    "px.png",'nx.png',"py.png","ny.png","pz.png","nz.png"
  ]),[])
  const camera = useCreation<PerspectiveCamera>(()=>{
    const tmp = new PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)
    tmp.position.set(90,-90,100)
    tmp.lookAt(new Vector3(0,0,0))
    tmp.up.set(0,1,0)
    return tmp
  },[])

  const orbitControls = useCreation<OrbitControls>(()=>{
    const tmp = new OrbitControls(camera,renderer.domElement)
    tmp.autoRotate=true 
    tmp.autoRotateSpeed=0.5
    tmp.enableDamping = true // 阻尼感
    tmp.maxDistance=200
    // tmp.minDistance=100
    tmp.enablePan=false // 是否能被拖动
    return tmp
  },[])

  const ambientLight = useCreation<AmbientLight>(()=>new AmbientLight('white',1),[])
  const directionalLight1 = useCreation<DirectionalLight>(()=>{
    const tmp = new DirectionalLight('white',1000*4*Math.PI)
    tmp.position.set(-10,40,20)
    return tmp
  },[])
  const directionalLight2 = useCreation<DirectionalLight>(()=>{
    const tmp = new DirectionalLight('white',1000*4*Math.PI)
    tmp.position.set(10,40,-20)
    return tmp
  },[])

  const renderFunc = useCallback(
    () => {
      orbitControls.update()
      renderer.render(scene,camera)
    
      const delta = clock.getDelta()

      if(visObj){
        visObj.rotation.y += delta * 0.7   
      }
      if(threeObj){
        threeObj.rotation.z += delta * 0.2
      }
      timer = requestAnimationFrame(renderFunc)
    },
    [],
  )
  
  useMount(()=>{
      scene.background = sceneTexture
      scene.environment = sceneTexture
      scene.add(
        ambientLight,
        directionalLight1,
        directionalLight2
      )
      const conatinerDom = containerDomRef.current
      if(conatinerDom){
        conatinerDom.appendChild(renderer.domElement)
        renderer.setSize(conatinerDom.offsetWidth,conatinerDom.offsetHeight,true)
        camera.aspect=conatinerDom.offsetWidth/conatinerDom.offsetHeight
        camera.updateProjectionMatrix()
      }
     renderFunc()
  })
    const containerDomRef = useRef<HTMLDivElement>(null)
    const onSave = useCallback(
      () => {
        if(typeof timer === 'number'){
          cancelAnimationFrame(timer)
        }
       
        const blob = new Blob([JSON.stringify(scene.toJSON())], {
          type: "text/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
    
        a.download = "three.json";
        a.click();
        renderFunc()
      },
      [],
    )
    
      
    return <div ref={containerDomRef} className={s.root}>
        <button className={s.button} onClick={onSave}>保存JSON</button>
    </div>
};

export default memo(ModalCreatedByThree)
