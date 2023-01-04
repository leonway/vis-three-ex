import { AmbientLight, Object3D, PointLight } from "three";


const ambientLight:AmbientLight = new AmbientLight('rgb(255,255,255)',0.3)
const pointLight:PointLight = new PointLight('rgb(255,255,255)',0.7,200,0.1)
pointLight.position.set(100,100,100)

export const LightsList:Object3D[] = []

LightsList.push(ambientLight,pointLight)
