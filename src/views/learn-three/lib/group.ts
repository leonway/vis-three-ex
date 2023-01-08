import { Group, Mesh, MeshStandardMaterial, PlaneGeometry } from "three"
import { pictureTexture, tipsTexture } from "./textures"
import { getFrame } from './load-model';


export const getGroup: () => Promise<Group> = async (): Promise<Group> => {
  const group = new Group()

  const picture: Mesh = new Mesh(
    new PlaneGeometry(192, 108),
    new MeshStandardMaterial({
      map: pictureTexture
    })
  )
  picture.receiveShadow = true
  picture.castShadow = true
  // plane.position.y=45
  // plane.rotation.y= Math.PI/180*45
  picture.scale.set(0.3, 0.3, 0.3)

  group.add(picture)

  const tips: Mesh = new Mesh(
    new PlaneGeometry(19, 10),
    new MeshStandardMaterial({
      map: tipsTexture
    })
  )
  tips.position.set(0,-30,0)
  
  group.add(tips)
  const frame = await getFrame()
  if(frame){
    group.add(frame)
  }
  group.position.y=70
  return group
}
