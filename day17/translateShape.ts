export default function translateShape(shape: number[][], x: number, y: number) {
  return shape.map(point => [point[0] + x, point[1] + y]);
}
