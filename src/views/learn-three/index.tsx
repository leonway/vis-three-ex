import React,{ useRef,useEffect } from 'react'
import Engine from './lib/engine'
import {BasicObjectList} from './lib/basic-object'
import {LightsList} from './lib/lights'
import {HelperList} from './lib/helper'
import {CodeModelList} from './lib/code-model'
import s from './index.module.less'

interface LearnThreeProps {}

const LearnThree: React.FC<LearnThreeProps> = componentProps => {
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
      const engine = new Engine(containerRef.current!)
     
      engine.addObject(...BasicObjectList)
      engine.addObject(...LightsList)
      engine.addObject(...HelperList)
      engine.addObject(...CodeModelList)
      
    }, [])
    
    return <div className={s.root} ref={containerRef}>
    </div>
};

export default LearnThree
