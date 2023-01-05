 import { Texture, TextureLoader } from 'three';

 const textureLoader:TextureLoader = new TextureLoader()

export const pictureTexture :Texture = textureLoader.load('/texture1.jpeg')


export const frameColorTexture = textureLoader.load('/custom-model/Tiles090_1K-JPG/Tiles090_1K_Color.jpg')
export const frameroughnessTexture = textureLoader.load('/custom-model/Tiles090_1K-JPG/Tiles090_1K_Roughness.jpg')
export const frameDisplacementTexture = textureLoader.load('/custom-model/Tiles090_1K-JPG/Tiles090_1K_Displacement.jpg')
