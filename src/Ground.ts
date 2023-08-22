import * as BABYLON from 'babylonjs'

export class Ground {
  mesh: BABYLON.Mesh

  constructor(scene: BABYLON.Scene) {
    this.mesh = BABYLON.MeshBuilder.CreateGround('Ground', { width: 10, height: 10 }, scene)
  }

  static create(scene: BABYLON.Scene) {
    return new Ground(scene)
  }
}
