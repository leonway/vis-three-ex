import { AxesHelper, DirectionalLightHelper, GridHelper, HemisphereLightHelper, Object3D, PointLightHelper,SpotLightHelper } from "three"
import {pointLight,spotLight,directionalLight,hemisphereLight} from './lights'

const axeshelper:AxesHelper  = new AxesHelper(500)
const gridHelper:GridHelper  = new GridHelper(500,20,'rgb(200,200,200)','rgb(100,100,100)')

const pointLightHelper:PointLightHelper = new PointLightHelper(pointLight,pointLight.distance,pointLight.color)

const spotLightHelper = new SpotLightHelper( spotLight ,spotLight.color);
const directionalLightHelper = new DirectionalLightHelper( directionalLight,5 );
const hemisphereLightHelper = new HemisphereLightHelper( hemisphereLight,5);

export const HelperList:Object3D[] =[]

HelperList.push(
  axeshelper,
  gridHelper,
  // pointLightHelper,
  spotLightHelper,
  // directionalLightHelper,
  // hemisphereLightHelper
  )
