import React,{Suspense} from 'react'
const Loading = ()=><div>Loading...</div>

const lazy = (path:string) => {
  const Comp = React.lazy(() => import(`/src/views${path}`));
  return (
    <Suspense fallback={<Loading />}>
      <Comp />
    </Suspense>
  );
};

const  displayByThree = lazy('/display/three/index.tsx')
const  displayByVisThree = lazy('/display/vis-three/index.tsx')
const  displayByloadThreeJson = lazy('/display-by-load-json/three')
const  displayByloadVisThreeJson = lazy('/display-by-load-json/vis-three')

const  displayngine = lazy('/document-ex/display-engine')
const  displayngineSupport = lazy('/document-ex/display-engine-support')
const  modelEngine = lazy('/document-ex/model-engine')
const  modelEngineSupport = lazy('/document-ex/model-engine-support')

const learnThree = lazy('/learn-three/index')

const routerConfig = [
  {
    name:'three搭建的场景',
    path:'three',
    key:'three',
    element:displayByThree
  },
  {
    name:'vis-three搭建的场景',
    path:'vis-three',
    key:'vis-three',
    element:displayByVisThree
  },
  {
    name:'three复原的场景',
    path:'three-load',
    key:'three-load',
    element:displayByloadThreeJson
  },
  {
    name:'vis-three复原的场景',
    path:'vis-three-load',
    key:'vis-three-load',
    element:displayByloadVisThreeJson,
  },
  {
    name:'display-engine',
    path:'display-engine',
    key:'display-engine',
    element:displayngine
  },
  {
    name:'display-engine-support',
    path:'display-engine-support',
    key:'display-engine-support',
    element:displayngineSupport
  },
  {
    name:'model-engine',
    path:'model-engine',
    key:'model-engine',
    element:modelEngine
  },
  {
    name:'model-engine-support',
    path:'model-engine-support',
    key:'model-engine-support',
    element:modelEngineSupport,
  },
  {
    name:'学习threejs',
    path:'learn-three',
    key:'learn-three',
    element:learnThree,
    index:true
  },
]

export default routerConfig
