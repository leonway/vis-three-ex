 import { CanvasTexture, Texture, TextureLoader } from 'three';
import { CanvasEditor } from './canvas-editor';
import pirturesConfigure from '../../../assets/json/pictures.json'

 const textureLoader:TextureLoader = new TextureLoader()

export const pictureTexture :Texture = textureLoader.load('/texture1.jpeg')


export const frameColorTexture = textureLoader.load('/custom-model/Tiles090_1K-JPG/Tiles090_1K_Color.jpg')
export const frameroughnessTexture = textureLoader.load('/custom-model/Tiles090_1K-JPG/Tiles090_1K_Roughness.jpg')
export const frameDisplacementTexture = textureLoader.load('/custom-model/Tiles090_1K-JPG/Tiles090_1K_Displacement.jpg')

export const tipsTexture = new CanvasTexture(
  new CanvasEditor(1920,1080)
  .draw((ctx)=>{
    ctx.fillStyle = "rgb(200, 200, 100)";

    ctx.beginPath();
    ctx.fillRect(0, 0, 1920, 1080);
    ctx.closePath();

    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "72px 微软雅黑";
    ctx.translate(960, 440);

    ctx.beginPath();
    ctx.fillText("作者：kieed", 0, 0);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillText("ID: 64226886", 0, 100);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillText("时间：2017年8月4日", 0, 200);
    ctx.closePath();
  })
  .canvas
  )

  
export const pricturesTextureList: Texture[] = [];
export const tipsTextureList: CanvasTexture[] = [];

pirturesConfigure.forEach((elem) => {
  pricturesTextureList.push(textureLoader.load(elem.url));
  tipsTextureList.push(
    new CanvasTexture(
      // .preview()
      new CanvasEditor(1920, 1080).draw((ctx) => {
        ctx.fillStyle = "rgb(200, 200, 100)";
        ctx.beginPath();
        ctx.fillRect(0, 0, 1920, 1080);
        ctx.closePath();

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "72px 微软雅黑";
        ctx.translate(960, 440);

        ctx.beginPath();
        ctx.fillText(`作者：${elem.author}`, 0, 0);
        ctx.closePath();

        ctx.beginPath();
        ctx.fillText(`ID: ${elem.ID}`, 0, 100);
        ctx.closePath();

        ctx.beginPath();
        ctx.fillText(`时间：${elem.date}`, 0, 200);
        ctx.closePath();

        ctx.beginPath();
        ctx.fillText(`类型：${elem.type}`, 0, 300);
        ctx.closePath();
      }).canvas
    )
  );
});
