 import { BoxGeometry, CylinderGeometry, Line, Mesh, MeshStandardMaterial, Object3D, Points, PointsMaterial, SphereGeometry } from "three";

export const BasicObjectList:Object3D[] = []

// 地面
const stage:Mesh = new Mesh(
  new BoxGeometry(200,10,200),
  new MeshStandardMaterial({
    color:'rgb(0,75,75)',
    roughness:0 
  })
)
stage.position.y = -5
stage.receiveShadow = true
stage.castShadow = true

// 盒子
const box:Mesh = new Mesh(
  new BoxGeometry(20,20,20),
  new MeshStandardMaterial({
    color:'rgb(255,0,0)',
    metalness:1,
    roughness:0.3
  })
) 
box.position.y = 10
box.castShadow = true
box.receiveShadow = true


BasicObjectList.push(stage,box)
