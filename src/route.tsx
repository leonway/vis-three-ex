import React,{Suspense} from 'react'
import {BrowserRouter,Route, Routes,Navigate} from 'react-router-dom'
import config from './config/routerConfig'
import Layout from './layout'

// const  doc1 = lazy('/document-ex/display-engine')
// const  doc1 = lazy('/document-ex/display-engine')


interface routeProps {}

const route: React.FC<routeProps> = componentProps => {
  const home = config.find(({index})=>index)
    return <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
          {config.map(({path,element})=><Route path={path} element={element} key={path} />)}
          {home&&<Route path='' element={<Navigate to={home.path} />} />}
        </Route>
    </Routes>
    </BrowserRouter>
};

export default route
