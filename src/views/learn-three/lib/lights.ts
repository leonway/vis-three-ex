import { AmbientLight, DirectionalLight, HemisphereLight, Object3D, PointLight, SpotLight, Vector3 } from "three";
import {wall} from './basic-object'

const ambientLight:AmbientLight = new AmbientLight('rgb(255,255,255)',0.3)

export const directionalLight:DirectionalLight = new DirectionalLight('rgb(255,255,255)',0.3)
directionalLight.lookAt(new Vector3(20,20,20))
directionalLight.position.set(100,100,100)

export const spotLight:SpotLight = new SpotLight('rgb(255,255,255)',1,2000,Math.PI/180*30,0,0)
spotLight.position.set( 0, 50, 800 ); 
spotLight.target = wall
spotLight.castShadow = true

export const hemisphereLight:HemisphereLight = new HemisphereLight('rgb(0,255,255)','rgb(255,0,255)',5)
hemisphereLight.position.set(-20,10,0)

export const pointLight:PointLight = new PointLight('rgb(255,255,255)',1,50,0.1)
pointLight.position.set(-20,50,-20)

export const LightsList:Object3D[] = []

LightsList.push(
  ambientLight,
  spotLight,
  // pointLight,
  // directionalLight,
  // hemisphereLight
  )
