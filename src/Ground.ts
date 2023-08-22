import * as BABYLON from '@babylonjs/core'
import pictureUrl from '../public/savanna.jpg'

export class Ground {
  mesh: BABYLON.Mesh

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
    const pictureMtl = new BABYLON.StandardMaterial('PictureMtl')
    const pictureTexture = new BABYLON.Texture(pictureUrl, scene, {})
    pictureMtl.diffuseTexture = pictureTexture
    ground.material = pictureMtl
    ground.scaling.x = 540 / 360

    return ground
  }

  static create(scene: BABYLON.Scene) {
    return new Ground(scene)
  }
}
