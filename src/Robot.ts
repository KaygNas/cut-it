import * as BABYLON from 'babylonjs'

export class Robot {
  mesh: BABYLON.Mesh

  constructor(scene: BABYLON.Scene) {
    this.mesh = this.createMesh(scene)
  }

  private createMesh(scene: BABYLON.Scene) {
    const outer = BABYLON.MeshBuilder.CreateCapsule('Robot', { height: 2.0, radius: 0.5 }, scene)
    outer.bakeTransformIntoVertices(BABYLON.Matrix.Translation(0.0, 1.0, 0.0))

    const outerMtl = new BABYLON.StandardMaterial('OuterMaterial', scene)
    outerMtl.alpha = 0.02
    outerMtl.opacityFresnelParameters = new BABYLON.FresnelParameters()
    outerMtl.opacityFresnelParameters.leftColor = new BABYLON.Color3(0.6, 0.6, 0.6)
    outerMtl.opacityFresnelParameters.rightColor = BABYLON.Color3.Black()
    outer.material = outerMtl

    const body = BABYLON.MeshBuilder.CreateCylinder('Body', {
      height: 1.0,
      diameter: 0.5,
      faceColors: Array.from<BABYLON.Color4>({ length: 3 }).fill(new BABYLON.Color4(1.0, 0.0, 0.0, 1.0)),
    })
    body.parent = outer
    body.position.y = 1.0

    const head = BABYLON.MeshBuilder.CreateBox('Head', {
      size: 0.3,
      faceColors: [
        new BABYLON.Color4(1.0, 1.0, 1.0, 1.0),
        new BABYLON.Color4(1.0, 0.0, 0.0, 1.0),
        new BABYLON.Color4(1.0, 0.0, 0.0, 1.0),
        new BABYLON.Color4(1.0, 0.0, 0.0, 1.0),
        new BABYLON.Color4(1.0, 0.0, 0.0, 1.0),
        new BABYLON.Color4(1.0, 0.0, 0.0, 1.0),
      ],
    })
    head.parent = body
    head.position.y = 0.7

    const leftEye = BABYLON.MeshBuilder.CreateSphere('LeftEye', { diameter: 0.06 })
    leftEye.parent = head
    leftEye.position.y = 0.02
    leftEye.position.z = 0.15
    leftEye.position.x = 0.06

    const rightEye = BABYLON.MeshBuilder.CreateSphere('RightEye', { diameter: 0.06 })
    rightEye.parent = head
    rightEye.position.y = 0.02
    rightEye.position.z = 0.15
    rightEye.position.x = -0.06

    const eyeMtl = new BABYLON.StandardMaterial('EyeMtl')
    eyeMtl.diffuseColor = BABYLON.Color3.Blue()
    leftEye.material = eyeMtl
    rightEye.material = eyeMtl

    const leftHand = BABYLON.MeshBuilder.CreateCylinder('LeftHand', {
      height: 0.6,
      diameter: 0.1,
      faceColors: Array.from<BABYLON.Color4>({ length: 3 }).fill(new BABYLON.Color4(0.4, 0.8, 0.4, 1.0)),
    })

    leftHand.rotate(BABYLON.Vector3.Backward(), -Math.PI / 6)
    leftHand.parent = body
    leftHand.position.y = 0.0
    leftHand.position.x = 0.5

    const rightHand = BABYLON.MeshBuilder.CreateCylinder('RightHand', {
      height: 0.6,
      diameter: 0.1,
      faceColors: Array.from<BABYLON.Color4>({ length: 3 }).fill(new BABYLON.Color4(0.4, 0.8, 0.4, 1.0)),
    })
    rightHand.rotate(BABYLON.Vector3.Backward(), Math.PI / 6)
    rightHand.parent = body
    rightHand.position.y = 0.0
    rightHand.position.x = -0.5

    const leftPalm = BABYLON.MeshBuilder.CreateSphere('LeftPalm', { diameter: 0.12 })
    const palmMtl = new BABYLON.StandardMaterial('PalmMtl')
    palmMtl.diffuseColor = new BABYLON.Color3(0.4, 0.8, 0.4)
    leftPalm.material = palmMtl
    leftPalm.position.y = -0.38
    const rightPalm = leftPalm.clone('RightPalm')
    leftPalm.parent = leftHand
    rightPalm.parent = rightHand

    return outer
  }

  static create(scene: BABYLON.Scene) {
    return new Robot(scene)
  }
}
