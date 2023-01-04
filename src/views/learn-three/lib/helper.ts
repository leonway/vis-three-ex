import { AxesHelper, GridHelper, Object3D, PointLightHelper } from "three"
import {pointLight} from './lights'

const axeshelper:AxesHelper  = new AxesHelper(500)
const gridHelper:GridHelper  = new GridHelper(500,20,'rgb(200,200,200)','rgb(100,100,100)')

const pointLightHelper:PointLightHelper = new PointLightHelper(pointLight,pointLight.distance,pointLight.color)

export const HelperList:Object3D[] =[]

HelperList.push(axeshelper,gridHelper,pointLightHelper)
