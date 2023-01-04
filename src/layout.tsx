import {useNavigate,useOutlet} from 'react-router-dom'
import routeConfig from './config/routerConfig'
import s from './layout.module.less'

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = componentProps => {
  const navigate = useNavigate()
  const outlet = useOutlet()
    return <div className={s.root}>
        <div className={s['button-box']}>
          {routeConfig.map(v=>  <button key={`button-${v.path}`} onClick={()=>navigate(v.path)}>{v.name}</button>)}
        </div>
      {outlet}
    </div>
};

export default Layout
