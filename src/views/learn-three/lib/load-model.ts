import { MeshStandardMaterial, TextureLoader } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {frameColorTexture,frameDisplacementTexture,frameroughnessTexture} from './textures'

const objLoader = new OBJLoader()
const gltfLoader = new GLTFLoader()

export const frameMaterial = new MeshStandardMaterial({
  map:frameColorTexture,
  roughnessMap:frameroughnessTexture,
  bumpMap:frameDisplacementTexture
})

// export const framePromise = objLoader.loadAsync('/custom-model/frame.obj')
export const framePromise = gltfLoader.loadAsync('/custom-model/frame.glb')
