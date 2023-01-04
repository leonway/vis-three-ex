import React,{ useRef } from 'react'
import s from './index.module.css'

interface DisplayEngineProps {}

const DisplayEngine: React.FC<DisplayEngineProps> = componentProps => {
    const containerRef = useRef<HTMLDivElement>(null)
    return <div ref={containerRef} className={s.root}></div>
};

export default DisplayEngine
