import { Group, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry, Sprite, SpriteMaterial } from "three"
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

  // const tips: Mesh = new Mesh(
  //   new PlaneGeometry(19, 10),
  //   new MeshBasicMaterial({
  //     map: tipsTexture
  //   })
  // )

  const tips: Sprite = new Sprite(
    new SpriteMaterial({
      map: tipsTexture,
      sizeAttenuation:false, // 物体不跟随镜头深度改变 而调整是镜头里的大小
      depthWrite:false, //  depthWrite：false depthTest:false 不再计算是否被遮挡 始终显示在镜头里
      depthTest:false
    })
  )

  tips.position.set(0,40,0)
  tips.scale.set(0.16,0.09,1)
  // tips.onBeforeRender = (...data)=>{
  //   tips.lookAt(data[2].position)
  // }
  
  group.add(tips)
  const frame = await getFrame()
  if(frame){
    group.add(frame)
  }
  group.position.y=70
  return group
}
