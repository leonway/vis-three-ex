import React,{ useRef } from 'react'
import * as THREE from "three";
import {DisplayEngineSupport,generateConfig,CONFIGTYPE} from 'vis-three'
import s from './index.module.css'
import { useMount } from 'ahooks';

interface DisplayEngineProps {}

const Doc: React.FC<DisplayEngineProps> = componentProps => {
    const containerRef = useRef<HTMLDivElement>(null)
    useMount(()=>{
    const engine = new DisplayEngineSupport()
    .setDom(containerRef.current)
    .setSize()
    .play()

    generateConfig.injectEngine = engine; 
const scene = generateConfig(CONFIGTYPE.SCENE);

engine.setSceneBySymbol(scene.vid);

generateConfig.injectScene = true;

generateConfig(CONFIGTYPE.POINTLIGHT, {
  position: {
    x: 30,
    y: 50,
  },
  distance: 100,
});

const material = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
  color: "rgb(255, 0, 0)",
});

const geometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
  width: 20,
  height: 40,
  depth: 60,
});

generateConfig(CONFIGTYPE.MESH, {
  geometry: geometry.vid,
  material: material.vid,
});
    
    })
    return <div ref={containerRef} className={s.root}></div>
};

export default Doc
