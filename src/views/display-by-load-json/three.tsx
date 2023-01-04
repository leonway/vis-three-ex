import React,{ useCallback,useRef } from 'react'
import {Clock,WebGLRenderer,Mesh,ReinhardToneMapping,PerspectiveCamera,Vector3,ObjectLoader} from 'three'
import { useMount,useCreation } from 'ahooks';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import s from './three.module.css'

interface ThreeLoadPageProps {}

const ThreeLoadPage: React.FC<ThreeLoadPageProps> = componentProps => {
  const containerDomRef = useRef<HTMLDivElement>(null)
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
  const clock = useCreation<Clock>(()=>new Clock(),[])
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
  const objectLoader = useCreation<ObjectLoader>(()=>new ObjectLoader(),[])

  let scene = useCreation<any>(()=>undefined,[])

  const renderFun = useCallback(
    () => {
      if(!scene){
        console.log('!scene');
      }
      if(scene){
        orbitControls.update()
        renderer.render(scene,camera)
        const delta = clock.getDelta()
      }
      requestAnimationFrame(renderFun)
    },
    [],
  )
  
  useMount(()=>{
    console.time('load')
    console.log('objectLoader',objectLoader);
    
    objectLoader.loadAsync('/three.json').then((threeScene)=>{
      console.timeEnd('load')
      console.log('threeScene',threeScene);
      
      scene = threeScene
      renderFun()
    })
    const dom = containerDomRef.current

    
    if(dom){
      dom.appendChild(renderer.domElement);
      renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
      camera.aspect = dom.offsetWidth / dom.offsetHeight;
      camera.updateProjectionMatrix();
    }
  })
    return <div ref={containerDomRef} className={s.root}>

    </div>
};

export default ThreeLoadPage
