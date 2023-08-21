import { App } from './App'

// eslint-disable-next-line no-console
console.log(`main.ts starting ${App.name}`)
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
  const app = new App(canvas)
  app.run()
})
