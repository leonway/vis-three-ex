import React,{ memo,useRef,useCallback } from 'react'
import {useMount,useCreation} from 'ahooks'
import { AniScriptLibrary, CONFIGTYPE, CubeTextureConfig, DisplayEngineSupport,generateConfig, PerspectiveCameraConfig, SceneConfig } from 'vis-three';
import { ReinhardToneMapping } from 'three';
import s from './index.module.css'

interface ModalCreatedByThreeProps {}

const ModalCreatedByThree: React.FC<ModalCreatedByThreeProps> = componentProps => {

  const containerDomRef = useRef<HTMLDivElement>(null)

  const engine = useCreation<DisplayEngineSupport>(()=>{
    const tmp = new DisplayEngineSupport() 
    generateConfig.injectEngine = tmp
    
    return tmp
  },[])

  const sceneConfig = useCreation<SceneConfig>(()=>{
    const tmp = generateConfig(CONFIGTYPE.SCENE)
    
    engine.setScene(tmp.vid)
    
    return tmp 
  },[])

  const cameraConfig = useCreation<PerspectiveCameraConfig>(()=>{
    const tmp = generateConfig(CONFIGTYPE.PERSPECTIVECAMERA,{
      far:10000,
      near:0.01,
      position:{
        x:90,
        y:-90,
        z:100
      }
    })
    
    engine.setCamera(tmp.vid)
    return tmp
  },[]) 

  let cubeTextureConfig = useCreation<CubeTextureConfig|undefined>(()=>undefined,[])

  useMount(()=>{
    engine.setDom(containerDomRef.current).setSize().play()
    generateConfig.injectScene=true
    generateConfig (CONFIGTYPE.WEBGLRENDERER,{
      clearColor: "rgba(10, 2, 10, 1)",
      physicallyCorrectLights: true,
      toneMapping: ReinhardToneMapping,
      toneMappingExposure: 3,
    })

    generateConfig(CONFIGTYPE.ORBITCONTROLS,{
      autoRotate: true,
  autoRotateSpeed: 0.5,
  enableDamping: true,
  maxDistance: 200,
  minDistance: 100,
  enablePan: false,
    })

    generateConfig(CONFIGTYPE.AMBIENTLIGHT,{
      intensity:1,
    })

    generateConfig(CONFIGTYPE.DIRECTIONALLIGHT,{
      color:'rgb(255, 255, 255)',
      position:{
        x:-10,
        y:40,
        z:20
      },
      intensity:1000 * 4 * Math.PI
    })

    generateConfig(CONFIGTYPE.DIRECTIONALLIGHT,{
      color:'rgb(255, 255, 255)',
      position:{
        x:10,
        y:40,
        z:-20
      },
      intensity:1000 * 4 * Math.PI
    })
    engine.loadResourcesAsync([
      '/resource/vis.obj',
      '/resource/three.obj',
      '/resource/vis-color-map.png',
      "/resource/px.png",
      '/resource/nx.png',
      "/resource/py.png",
      "/resource/ny.png",
      "/resource/pz.png",
      "/resource/nz.png"
    ]).then(({resourceConfig})=>{
      console.log('resourceConfig',resourceConfig);
      
      cubeTextureConfig = generateConfig(CONFIGTYPE.CUBETEXTURE,{
        cube:{
          px:"/resource/px.png",
          py:"/resource/py.png",
          pz:"/resource/pz.png",
          nx:"/resource/nx.png",
          ny:"/resource/ny.png",
          nz:"/resource/nz.png",
        }
      })
      
      sceneConfig.background = cubeTextureConfig?.vid
      sceneConfig.environment = cubeTextureConfig?.vid

      const threeGeometry = generateConfig(
        CONFIGTYPE.LOADGEOMETRY,
        Object.assign(
          Object.values(resourceConfig['/resource/three.obj'].geometry)[0],
          {
            rotation: {
              x: Math.PI / 2,
              y: -(Math.PI / 180) * 30,
            },
            position: {
              x: 0.13,
              y: -0.14,
            },
            scale: {
              x: 80,
              y: 80,
              z: 80,
            },
          }
        )
      )

      const threeMaterial = generateConfig(
        CONFIGTYPE.MESHSTANDARDMATERIAL,
        {
          color: "white",
      metalness: 1,
      roughness: 0,
      envMapIntensity: 0.8,
        }
      )

      const threeMesh = generateConfig(
        CONFIGTYPE.MESH,
        {
          geometry:threeGeometry.vid,
          material:threeMaterial.vid,
        }
      )

      const visColorMapTexture = generateConfig(CONFIGTYPE.IMAGETEXTURE,{
        url:'/resource/vis-color-map.png'
      })

      const visGeometry = generateConfig(
        CONFIGTYPE.LOADGEOMETRY,
        Object.assign(
          Object.values(resourceConfig['/resource/vis.obj'].geometry)[0],
          {
            scale:{
              x:6,
              y:6, 
              z:6
            }
          }
        )
      )

      const visMaterial = generateConfig(
        CONFIGTYPE.MESHSTANDARDMATERIAL,
        {
          metalness:1,
          roughness:0,
          transparent:true,
          opacity:0.8,
          map:visColorMapTexture.vid
        }
      )

      const visMesh = generateConfig(
        CONFIGTYPE.MESH,
        {
          geometry:visGeometry.vid,
          material:visMaterial.vid,
        }
      )
      
      generateConfig(CONFIGTYPE.SCRIPTANIMATION,{
        target:threeMesh.vid,
        attribute:'.rotation.z',
        script:AniScriptLibrary.generateConfig('linearTime',{
          multiply:0.2
        })
      })
      
      generateConfig(CONFIGTYPE.SCRIPTANIMATION,{
        target:visMesh.vid,
        attribute:'.rotation.y',
        script:AniScriptLibrary.generateConfig('linearTime',{
          multiply:0.7
        })
      })
    })
   
  })

  const onSave = useCallback(
    async () => {
      engine.stop()
      const blob = new Blob([engine.toJSON()], {
        type: "text/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
  
      a.download = "vis.json";
      a.click();
      engine.play()
    },
    [],
  )
  
    
    return <div ref={containerDomRef} className={s.root}>
      <button className={s.button} onClick={onSave}>保存JSON</button>
    </div>
};

export default memo(ModalCreatedByThree)
