import * as BABYLON from 'babylonjs'
import { Ground } from './Ground'
import { Robot } from './Robot'

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

  debug(debugOn: boolean = true) {
    if (debugOn)
      this.scene.debugLayer.show({ overlay: true })
    else
      this.scene.debugLayer.hide()
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

  const camera = new BABYLON.ArcRotateCamera('RobotCamera', Math.PI / 2, Math.PI / 3, 10.0, BABYLON.Vector3.Zero(), scene)
  camera.attachControl(canvas, true)

  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene)
  light.intensity = 0.7

  return scene
}
