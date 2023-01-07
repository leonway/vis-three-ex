 import { BoxGeometry, Color, CylinderGeometry, Line, Material, Mesh, MeshStandardMaterial, Object3D, PlaneGeometry, Points, PointsMaterial, SphereGeometry } from "three";
 import {pictureTexture} from './textures'
 import {VertexNormalsHelper} from 'three/examples/jsm/helpers/VertexNormalsHelper'

export const BasicObjectList:Object3D[] = []

// 地面
const stage:Mesh = new Mesh(
  new BoxGeometry(600,10,500),
  new MeshStandardMaterial({
    color:'rgb(0,75,75)',
    roughness:0 
  })
)
stage.position.y = -5
stage.receiveShadow = true
stage.castShadow = true

// 墙面
export const wall:Mesh = new Mesh(
  new BoxGeometry(600,100,5),
  new MeshStandardMaterial({
    color:'green',
    // roughness:0
  })  
)
wall.castShadow=true
wall.receiveShadow = true
wall.position.y=50
wall.position.z=-3 

wall.updateMatrix()
wall.updateMatrixWorld()
// wall.rotation.y=Math.PI/180*45
wall.addEventListener('click',()=>{
  console.log('wall mouseenter');
 ( wall.material as MeshStandardMaterial).color = new Color('red')
})
// wall.addEventListener('mousemove',()=>{
//   console.log('wall mousemove');
// })
wall.addEventListener('mouseleave',()=>{
  console.log('wall mouseleave');
  ( wall.material as MeshStandardMaterial).color = new Color('white')
})
BasicObjectList.push(
  stage,
  wall
  )
