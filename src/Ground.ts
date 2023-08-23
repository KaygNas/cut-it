import * as BABYLON from '@babylonjs/core'
import * as BABYLON_GUI from '@babylonjs/gui'
import type { ImageDetectionItem } from './interfaces'

export class Ground {
  mesh: BABYLON.Mesh
  image?: BABYLON_GUI.Image
  imageFile?: File
  detections?: ImageDetectionItem[]

  constructor(scene: BABYLON.Scene) {
    this.mesh = this.createMesh(scene)
  }

  private createMesh(scene: BABYLON.Scene) {
    const ground = BABYLON.MeshBuilder.CreateGround('Ground', { width: 10, height: 10 }, scene)
    const pictureFrame = BABYLON.MeshBuilder.CreateTube('PictureFrame', {
      path: [
        new BABYLON.Vector3(5.0, 0.0, -5.0),
        new BABYLON.Vector3(-5.0, 0.0, -5.0),
        new BABYLON.Vector3(-5.0, 0.0, 5.0),
        new BABYLON.Vector3(5.0, 0.0, 5.0),
        new BABYLON.Vector3(5.0, 0.0, -5.0),
      ],
      radius: 0.2,
    })
    pictureFrame.parent = ground

    return ground
  }

  async setImage(file: File) {
    this.imageFile = file
    const ground = this.mesh
    const pictureMtl = BABYLON_GUI.AdvancedDynamicTexture.CreateForMesh(ground)
    const url = URL.createObjectURL(file)
    const image = new BABYLON_GUI.Image('Picture', url)
    this.image = image
    image.onImageLoadedObservable.addOnce(() => {
      const scaling = BABYLON.Matrix.Scaling(image.imageWidth / image.imageHeight, 1, 1)
      ground.bakeTransformIntoVertices(scaling)
      ground.getChildMeshes().forEach(child => (child as BABYLON.Mesh).bakeTransformIntoVertices(scaling))
    })
    pictureMtl.addControl(image)

    const rect = new BABYLON_GUI.Rectangle('T')
    pictureMtl.addControl(rect)
  }

  async setDetections(detections: ImageDetectionItem[]) {
    this.detections = detections
    const image = this.image
    const pictureTexture = this.mesh.material?.getActiveTextures()[0] as BABYLON_GUI.AdvancedDynamicTexture | undefined
    if (!pictureTexture || !image)
      return
    detections.forEach((detection) => {
      const rect = new BABYLON_GUI.Rectangle(detection.label)
      rect.width = (detection.box.xmax - detection.box.xmin) / image.imageWidth
      rect.height = (detection.box.ymax - detection.box.ymin) / image.imageHeight
      rect.left = `${detection.box.xmin / image.imageWidth * 100}%`
      rect.top = `${detection.box.ymin / image.imageHeight * 100}%`
      rect.color = '#00ff00'
      rect.thickness = 4
      rect.background = '#00ff0026'
      rect.verticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP
      rect.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
      pictureTexture.addControl(rect)
    })
  }

  static create(scene: BABYLON.Scene) {
    return new Ground(scene)
  }
}
