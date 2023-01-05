import { BufferAttribute, BufferGeometry, Color, DoubleSide, Mesh, MeshStandardMaterial, Object3D } from "three";
import { pictureTexture } from "./textures";
import {VertexNormalsHelper} from 'three/examples/jsm/helpers/VertexNormalsHelper'

export const CodeModelList: Object3D[] = []

const size: number = 10

const points: Float32Array = new Float32Array([
  -size, size, size,
  size, size, size,
  size, size, -size,
  -size, size, -size,

  -size, -size, size,
  size, -size, size,
  size, -size, -size,
  -size, -size, -size,

  -size, size, size,
  -size, size, -size,
  -size, -size, -size,
  -size, -size, size,

  size, size, size,
  size, size, -size,
  size, -size, -size,
  size, -size, size,

  -size, size, size,
  size, size, size,
  size, -size, size,
  -size, -size, size,
  

  -size, size, -size,
  size, size, -size,
  size, -size, -size,
  -size, -size, -size,
  
])

const normals: Float32Array = new Float32Array([
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,

  0, -1, 0,
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,

  -1, 0, 0,
  -1, 0, 0,
  -1, 0, 0,
  -1, 0, 0,

  1, 0, 0,
  1, 0, 0,
  1, 0, 0,
  1, 0, 0,

  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,

  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
])

const uv: Float32Array = new Float32Array([
  0, 0,
  1, 0,
  1, 1,
  0, 1,

  0, 0,
  1, 0,
  1, 1,
  0, 1,

  0, 0,
  1, 0,
  1, 1,
  0, 1,

  0, 0,
  1, 0,
  1, 1,
  0, 1,

  0, 0,
  1, 0,
  1, 1,
  0, 1,

  0, 0,
  1, 0,
  1, 1,
  0, 1,
])

const index: number[] = [
  0, 1, 2,
  2, 3, 0,

  4, 5, 6,
  6, 7, 4,

  8, 9, 10,
  10, 11, 8,

  12, 14, 13,
  14, 12, 15,

  16, 18, 17,
  18, 16, 19,

  20, 21, 22,
  22, 23, 20
]



const geometry: BufferGeometry = new BufferGeometry()

geometry.setAttribute('position', new BufferAttribute(points, 3))
geometry.setAttribute('normal', new BufferAttribute(normals, 3))
geometry.setAttribute('uv', new BufferAttribute(uv, 2))

geometry.setIndex(index)

const material: MeshStandardMaterial = new MeshStandardMaterial({
  color: 'white',
  // map: pictureTexture
})

const codeBox: Mesh = new Mesh(geometry, material)

codeBox.position.y = 10

// codeBox.rotation.x = Math.PI / 180 * 90

const boxNormalHelper = new VertexNormalsHelper(codeBox, 10, new Color('blue').getHex())

CodeModelList.push(codeBox, boxNormalHelper)
