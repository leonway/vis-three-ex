import { Group, Material, Mesh, MeshStandardMaterial, TextureLoader } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import {frameColorTexture,frameDisplacementTexture,frameroughnessTexture} from './textures'
import { DefaultLoaderManager } from "./loader-manager";

const objLoader = new OBJLoader()
// const gltfLoader = new GLTFLoader()

// export const framePromise = objLoader.loadAsync('/custom-model/frame.obj')
export const framePromise = new Promise<Mesh>((resolve, reject) => {
  DefaultLoaderManager.addEventListener("loaded", (event) => {
    const scourceMap = event.sourceMap;
    const group = scourceMap["/custom-model/frame.obj"];
    const frame: Mesh = group.children[0] as Mesh;
    (frame.material as Material).dispose();

    frame.material = new MeshStandardMaterial({
      map: scourceMap["/custom-model/Tiles090_1K-JPG/Tiles090_1K_Color.jpg"],
      roughnessMap: scourceMap["/custom-model/Tiles090_1K-JPG/Tiles090_1K_Roughness.jpg"],
      bumpMap: scourceMap["/custom-model/Tiles090_1K-JPG/Tiles090_1K_Displacement.jpg"],
    });

    frame.rotation.y = (Math.PI / 180) * -90;
    frame.scale.set(2, 2, 2);

    resolve(frame);
  });
});


// export const getFrame = async ():Promise<Mesh|null>=>{
//   const frameMaterial = new MeshStandardMaterial({
//     map:frameColorTexture,
//     roughnessMap:frameroughnessTexture,
//     bumpMap:frameDisplacementTexture
//   })
//   const group = await objLoader.loadAsync('/custom-model/frame.obj')
//   if(group instanceof Group){
//     const frameMesh:Mesh =  group.children[0] as Mesh
//     (frameMesh.material as Material).dispose()
//     frameMesh.material = frameMaterial
   
//     // engine.addObject(frameMesh)
//     // frameMesh.position.y=45
//     frameMesh.rotation.y= Math.PI/180*-90
//     frameMesh.scale.set(2,2,2)
//     return frameMesh
//   }else{
//     console.error('group is not a Group');
//     return null
//   }
// }
