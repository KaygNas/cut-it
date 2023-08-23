export interface ImageDetectionItem {
  score: number
  label: string
  box: {
    xmin: number
    ymin: number
    xmax: number
    ymax: number
  }
}
