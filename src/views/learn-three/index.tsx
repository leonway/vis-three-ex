import React, { useRef, useEffect } from 'react'
import Engine from './lib/engine'
import { message } from 'antd'
import { BasicObjectList } from './lib/basic-object'
import { LightsList } from './lib/lights'
import { HelperList } from './lib/helper'
import { CodeModelList } from './lib/code-model'
import { framePromise } from './lib/load-model'
import s from './index.module.less'
import { Material, Mesh } from 'three'
import { groupPromise, groupListPromise } from './lib/group'
import { DefaultLoaderManager } from './lib/loader-manager'

interface LearnThreeProps {}

let loaded = false
let timer: number | undefined = undefined

const makerContent = (): any => {

  const { tipsBox } = DefaultLoaderManager
  // console.log(' total, success, error', tipsBox.total, tipsBox.success, tipsBox.error);

  return {
    type: 'loading',
    key: 'tips',
    content: `加载资源中:${Math.round(((tipsBox.success + tipsBox.error) / tipsBox.total) * 100)}%`,
    duration: 0,
  }
}

const LearnThree: React.FC<LearnThreeProps> = (componentProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    message.open(makerContent())
    timer = setInterval(() => {
      if (loaded && timer !== undefined) {
        clearInterval(timer)
        return
      }
      message.open(makerContent())
    }, 200)

    const onLoadedFunc = () => {
      // console.log('loaded')
      message.open({
        type: 'success',
        key: 'tips',
        content: '加载完成',
        duration: 1.5,
      })
      loaded = true
    }
    DefaultLoaderManager.addEventListener('loaded',onLoadedFunc )

    const engine = new Engine(containerRef.current!)

    engine.addObject(...BasicObjectList)
    engine.addObject(...LightsList)
    engine.addObject(...HelperList)
    engine.addObject(...CodeModelList)
    // getGroup().then(frameGroup=>{
    //   engine.addObject(frameGroup)
    // })
    groupListPromise.then((groupList) => {
      engine.addObject(...groupList)
    })
    
    return ()=>{
      DefaultLoaderManager.removeEventListener('loaded',onLoadedFunc)
    }
  }, [])

  return <div className={s.root} ref={containerRef}></div>
}

export default LearnThree
