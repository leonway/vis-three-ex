import React,{ useRef } from 'react'
import {
  DisplayEngineSupport,
  generateConfig,
  JSONHandler,
  Template,
} from "vis-three";
import { useMount,useCreation } from 'ahooks';
import s from './vis-three.module.css'
console.log('Template',Template);


interface VisThreeloaderProps {}

const VisThreeloader: React.FC<VisThreeloaderProps> = componentProps => {
  const engine = useCreation<DisplayEngineSupport>(()=>new DisplayEngineSupport(),[])
  const containerDomRef = useRef<HTMLDivElement>(null)
    useMount(()=>{
      if(containerDomRef.current){
        engine.setDom(containerDomRef.current).setSize().play();
      }
      console.time('load')
      fetch('vis.json')
      .then(res=>res.json())
      .then((config)=>{
        console.log('config1',config);
        
        engine
        .loadConfigAsync(
          Template.handler(
            JSONHandler.clone(config),
            (c)=>{
              console.log('c',c);
              const tmp = generateConfig(c.type,c)
              console.log('tmp',tmp);
              
              return tmp
              
            }
          )
        )
        .then(()=>{
          console.timeEnd('load')
          console.log();
          
          engine.setScene(config.scene[0].vid)
          engine.setCamera(config.camera[0].vid)
        })
      })
    })
    return <div ref={containerDomRef} className={s.root}>

    </div>
};

export default VisThreeloader
