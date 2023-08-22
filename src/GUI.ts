import * as BABYLON from '@babylonjs/core'
import * as BABYLON_GUI from '@babylonjs/gui'

export class GUI {
  root: BABYLON.TransformNode
  constructor(scene: BABYLON.Scene) {
    const root = new BABYLON.TransformNode('GUI', scene)
    this.root = root
    const gui = BABYLON_GUI.AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, scene)
    const uploadBtn = BABYLON_GUI.Button.CreateSimpleButton('Upload', 'Upload Image')
    uploadBtn.width = '160px'
    uploadBtn.height = '40px'
    uploadBtn.color = 'white'
    uploadBtn.top = -10
    uploadBtn.left = -160 * 2 + -20 * 2
    uploadBtn.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    uploadBtn.verticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_BOTTOM

    const detectBtn = BABYLON_GUI.Button.CreateSimpleButton('Detect', 'Detect Image')
    detectBtn.width = '160px'
    detectBtn.height = '40px'
    detectBtn.color = 'white'
    detectBtn.left = '400px'
    detectBtn.top = -10
    detectBtn.left = -160 * 1 + -20 * 1
    detectBtn.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    detectBtn.verticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_BOTTOM

    const classifyBtn = BABYLON_GUI.Button.CreateSimpleButton('Classify', 'Classify')
    classifyBtn.width = '160px'
    classifyBtn.height = '40px'
    classifyBtn.color = 'white'
    classifyBtn.top = -10
    classifyBtn.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    classifyBtn.verticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_BOTTOM

    gui.addControl(uploadBtn)
    gui.addControl(detectBtn)
    gui.addControl(classifyBtn)
  }

  static create(scene: BABYLON.Scene) {
    return new GUI(scene)
  }
}
