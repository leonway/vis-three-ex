import React,{ useRef,useEffect } from 'react'
import Engine from './lib/engine'
import {BasicObjectList} from './lib/basic-object'
import {LightsList} from './lib/lights'
import {HelperList} from './lib/helper'
import {CodeModelList} from './lib/code-model'
import {framePromise,frameMaterial} from './lib/load-model'
import s from './index.module.less'
import { Material, Mesh } from 'three'

interface LearnThreeProps {}

const LearnThree: React.FC<LearnThreeProps> = componentProps => {
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
      const engine = new Engine(containerRef.current!)
     
      engine.addObject(...BasicObjectList)
      engine.addObject(...LightsList)
      engine.addObject(...HelperList)
      engine.addObject(...CodeModelList)
      framePromise.then(group=>{
        console.log('group',group);
      const scene = group.scenes[0]
        const frameMesh:Mesh =  scene.children[0] as Mesh
        (frameMesh.material as Material).dispose()
        frameMesh.material = frameMaterial
       
        // engine.addObject(frameMesh)
        frameMesh.position.y=45
        frameMesh.rotation.y= Math.PI/180*-45
        frameMesh.scale.set(2,2,2)
        engine.addObject(frameMesh)
        

      })
    }, [])
    
    return <div className={s.root} ref={containerRef}>
    </div>
};

export default LearnThree
