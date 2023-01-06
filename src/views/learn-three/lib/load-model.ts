import { Group, Material, Mesh, MeshStandardMaterial, TextureLoader } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {frameColorTexture,frameDisplacementTexture,frameroughnessTexture} from './textures'

const objLoader = new OBJLoader()
// const gltfLoader = new GLTFLoader()

// export const framePromise = objLoader.loadAsync('/custom-model/frame.obj')

export const getFrame = async ():Promise<Mesh|null>=>{
  const frameMaterial = new MeshStandardMaterial({
    map:frameColorTexture,
    roughnessMap:frameroughnessTexture,
    bumpMap:frameDisplacementTexture
  })
  const group = await objLoader.loadAsync('/custom-model/frame.obj')
  if(group instanceof Group){
    const frameMesh:Mesh =  group.children[0] as Mesh
    (frameMesh.material as Material).dispose()
    frameMesh.material = frameMaterial
   
    // engine.addObject(frameMesh)
    frameMesh.position.y=45
    frameMesh.rotation.y= Math.PI/180*-90
    frameMesh.scale.set(2,2,2)
    return frameMesh
  }else{
    console.error('group is not a Group');
    return null
  }
}
