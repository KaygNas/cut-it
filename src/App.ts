import * as BABYLON from '@babylonjs/core'
import { Inspector } from '@babylonjs/inspector'
import { Ground } from './Ground'
import { Robot } from './Robot'
import { GUI } from './GUI'
import type { ImageDetectionItem } from './interfaces'

export class App {
  engine: BABYLON.Engine
  scene: BABYLON.Scene

  constructor(readonly canvas: HTMLCanvasElement) {
    this.engine = new BABYLON.Engine(canvas)
    window.addEventListener('resize', () => {
      this.engine.resize()
    })
    this.scene = createScene(this.engine, this.canvas)
  }

  async debug(debugOn: boolean = true) {
    if (debugOn)
      Inspector.Show(this.scene, { overlay: true })
    else
      Inspector.Hide()
  }

  run() {
    this.debug(true)
    this.engine.runRenderLoop(() => {
      this.scene.render()
    })
  }
}

function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
  const scene = new BABYLON.Scene(engine)
  const robot = Robot.create(scene)
  const ground = Ground.create(scene)
  const gui = GUI.create(scene)

  gui.uploadBtn.onPointerClickObservable.add(async () => {
    const file = await uploadImage()
    ground.setImage(file)
  })
  gui.detectBtn.onPointerClickObservable.add(async () => {
    if (!ground.imageFile)
      return

    const result = await detectImage(ground.imageFile)
    ground.setDetections(result)
  })

  const camera = new BABYLON.ArcRotateCamera('RobotCamera', Math.PI / 2, Math.PI / 3, 10.0, BABYLON.Vector3.Zero(), scene)
  camera.attachControl(canvas, true)

  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene)
  light.intensity = 0.7

  return scene
}

async function uploadImage() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.png,.jpg,.jpeg'
  return new Promise<File>((resolve) => {
    input.addEventListener('change', () => {
      const file = input.files?.[0]
      if (!file)
        return

      resolve(file)
    })
    input.click()
  })
}

async function detectImage(file: File): Promise<ImageDetectionItem[]> {
  // MOCK
  const result = [
    {
      score: 0.9988985061645508,
      label: 'zebra',
      box: {
        xmin: 360,
        ymin: 250,
        xmax: 399,
        ymax: 312,
      },
    },
    {
      score: 0.9592618942260742,
      label: 'giraffe',
      box: {
        xmin: 12,
        ymin: 150,
        xmax: 209,
        ymax: 259,
      },
    },
    {
      score: 0.998805046081543,
      label: 'zebra',
      box: {
        xmin: 113,
        ymin: 238,
        xmax: 227,
        ymax: 322,
      },
    },
    {
      score: 0.9794006943702698,
      label: 'zebra',
      box: {
        xmin: 195,
        ymin: 232,
        xmax: 319,
        ymax: 303,
      },
    },
    {
      score: 0.9989868998527527,
      label: 'giraffe',
      box: {
        xmin: 364,
        ymin: 97,
        xmax: 538,
        ymax: 309,
      },
    },
  ]
  // const data = await file.arrayBuffer()
  // const response = await fetch(
  //   'https://api-inference.huggingface.co/models/facebook/detr-resnet-50',
  //   {
  //     headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  //     method: 'POST',
  //     body: data,
  //   },
  // )
  // const result = await response.json()
  return result
}
