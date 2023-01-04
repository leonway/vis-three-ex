import React,{ useRef,useEffect } from 'react'
import Engine from './lib/engine'
import s from './index.module.less'

interface LearnThreeProps {}

const LearnThree: React.FC<LearnThreeProps> = componentProps => {
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
      const engine = new Engine(containerRef.current!)
    }, [])
    
    return <div className={s.root} ref={containerRef}>
    </div>
};

export default LearnThree
