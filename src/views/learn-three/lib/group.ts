import { Group, Mesh, MeshStandardMaterial, PlaneGeometry } from "three"
import { pictureTexture } from "./textures"
import { getFrame } from './load-model';


export const getGroup: () => Promise<Group> = async (): Promise<Group> => {
  const group = new Group()

  const plane: Mesh = new Mesh(
    new PlaneGeometry(192, 108),
    new MeshStandardMaterial({
      map: pictureTexture
    })
  )
  plane.receiveShadow = true
  plane.castShadow = true
  // plane.position.y=45
  // plane.rotation.y= Math.PI/180*45
  plane.scale.set(0.3, 0.3, 0.3)

  group.add(plane)
  const frame = await getFrame()
  if(frame){
    group.add(frame)
  }
  group.position.y=120
  return group
}
