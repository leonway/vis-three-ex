import { BoxGeometry, CylinderGeometry, Line, Mesh, MeshStandardMaterial, Object3D, Points, PointsMaterial, SphereGeometry } from "three";

const boxGeometry = new BoxGeometry(10,10,10)
const cylinderGeometry = new CylinderGeometry(5,5,10,32,5)

const meshMaterial = new MeshStandardMaterial({color:'green'})
const pointsMaterial = new PointsMaterial({color:'green'})



export const box: Mesh = new Mesh(
  boxGeometry,
  meshMaterial
)

box.position.x=-10

export const sphere:Points = new Points(
  new SphereGeometry(5,20,20),
  pointsMaterial
)
sphere.position.x=10

export const cylinder:Line = new Line(
  boxGeometry,
  meshMaterial
)
cylinder.position.z=10

export const cylinder2:Points = new Points(
  cylinderGeometry,
  pointsMaterial
)
cylinder2.position.z=-10
       
export const BasicObjectList:Object3D[] = []
BasicObjectList.push(box,sphere,cylinder,cylinder2)
