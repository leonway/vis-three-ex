import { AmbientLight, Object3D } from "three";


const ambientLight:AmbientLight = new AmbientLight('rgb(255,255,255)',1)

export const LightsList:Object3D[] = []

LightsList.push(ambientLight)
