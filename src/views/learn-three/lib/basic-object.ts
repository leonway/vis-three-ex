 import { BoxGeometry, CylinderGeometry, Line, Mesh, MeshStandardMaterial, Object3D, Points, PointsMaterial, SphereGeometry } from "three";

export const BasicObjectList:Object3D[] = []

// 地面
const stage:Mesh = new Mesh(
  new BoxGeometry(200,10,200),
  new MeshStandardMaterial({color:'rgb(150,150,150)'})
)
stage.position.y = -5
stage.receiveShadow = true

// 盒子
const box:Mesh = new Mesh(
  new BoxGeometry(20,20,20),
  new MeshStandardMaterial({color:'rgb(255,0,0)'})
)
box.position.y = 10
box.castShadow = true


BasicObjectList.push(stage,box)
