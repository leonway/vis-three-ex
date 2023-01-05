import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const objLoader = new OBJLoader()
const materialLoader = new MTLLoader()

export const framePromise = new Promise((res,rej)=>{
  materialLoader.loadAsync('/custom-model/frame.mtl').then((mtl) => {
    objLoader.setMaterials(mtl).loadAsync('/custom-model/frame.obj').then(obj=>{
      res(obj)
    }).catch(e=>rej(e))
  }).catch((err) => {
    rej(err)
  });

}) 
