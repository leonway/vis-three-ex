 import { BoxGeometry, Color, CylinderGeometry, Line, Mesh, MeshStandardMaterial, Object3D, PlaneGeometry, Points, PointsMaterial, SphereGeometry } from "three";
 import {pictureTexture} from './textures'
 import {VertexNormalsHelper} from 'three/examples/jsm/helpers/VertexNormalsHelper'

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
    color:'rgb(255,255,255x)',
    // map:pictureTexture
  })
) 
box.position.y = 10
box.position.x = 25
box.castShadow = true
box.receiveShadow = true

const boxNormalHelper = new VertexNormalsHelper(box,10,new Color('blue').getHex())

const plane:Mesh = new Mesh(
  new PlaneGeometry(192,108),
  new MeshStandardMaterial({
    map:pictureTexture
  })
)
plane.position.y=45
plane.rotation.y= Math.PI/180*45
plane.scale.set(0.3,0.3,0.3)

BasicObjectList.push(
  stage,
  box,
  plane,
  boxNormalHelper
  )
