import { BaseEvent, EventDispatcher, Loader, TextureLoader } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import pirturesConfigure from "../../../assets/json/pictures.json";

export interface LoadedEvent extends BaseEvent {
  sourceMap: { [key: string]: any };
}

const imageLoader = new TextureLoader();

export class LoaderManager extends EventDispatcher<LoadedEvent> {
  tipsBox = {
    total: 0,
    success: 0,
    error: 0,
    progress: 0,
  };

  loaderMap: { [key: string]: Loader } = {
    jpg: imageLoader,
    jpeg: imageLoader,
    png: imageLoader,
    obj: new OBJLoader(),
    mtl: new MTLLoader(),
  };

  sourceMap: { [key: string]: any } = {
    // url: group
    // url: Texture
  };

  constructor() {
    super();
  }

  load(urls: string[]) {
    this.dispatchEvent({
      type: "startLoad",
      sourceMap: this.sourceMap,
    });
    this.tipsBox.total += urls.length;

    for (const url of urls) {
      const ext = url.split(".").pop();

      // 不支持的url
      if (!ext || !this.loaderMap[ext]) {
        console.log('error',ext);
        
        this.tipsBox.error += 1;
        console.warn(`找不到支持的loader：${url}`);
        continue;
      }

      // 避免资源重复加载
      if (this.sourceMap[url]) {
        this.tipsBox.success += 1;
        continue;
      }

      // 加载资源
      const loader = this.loaderMap[ext];

      this.tipsBox.progress += 1;

      loader
        .loadAsync(url)
        .then((res) => {
          this.sourceMap[url] = res;
          this.tipsBox.success += 1;
          this.tipsBox.progress -= 1;
          this.dispatchLoaded();
        })
        .catch((err) => {
          this.tipsBox.error += 1;
          this.tipsBox.progress -= 1;
          this.dispatchLoaded();
        });
    }
  }

  private dispatchLoaded() {
    if (this.tipsBox.total === this.tipsBox.success + this.tipsBox.error) {
      this.dispatchEvent({
        type: "loaded",
        sourceMap: this.sourceMap,
      });
    }
  }
}

export const DefaultLoaderManager = new LoaderManager();


const urls = [
  "/texture1.jpeg",
  "/custom-model/Tiles090_1K-JPG/Tiles090_1K_Color.jpg",
  "/custom-model/Tiles090_1K-JPG/Tiles090_1K_Roughness.jpg",
  "/custom-model/Tiles090_1K-JPG/Tiles090_1K_Displacement.jpg",
  "/custom-model/frame.obj",
];

pirturesConfigure.forEach((elem) => {
  urls.push(elem.url);
});

DefaultLoaderManager.load(urls);

