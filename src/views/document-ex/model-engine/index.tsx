import React,{ useRef } from 'react'
import * as THREE from "three";
import {ModelingEngine} from 'vis-three'
import s from './index.module.css'
import { useMount } from 'ahooks';

interface DisplayEngineProps {}

const Doc: React.FC<DisplayEngineProps> = componentProps => {
    const containerRef = useRef<HTMLDivElement>(null)
    useMount(()=>{
    const engine = new ModelingEngine()
    .setDom(containerRef.current)
    .setSize()
    .play()


    engine.scene.add(new THREE.AmbientLight());

    engine.scene.add(
      new THREE.Mesh(
        new THREE.BoxBufferGeometry(10, 10, 10),
        new THREE.MeshStandardMaterial({ color: "rgb(255, 105, 100)" })
      )
    );
    })
    return <div ref={containerRef} className={s.root}></div>
};

export default Doc
