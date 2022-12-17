export default function shapeToString(shape: number[][]) {
  return shape.map(point => point.join(','));
}
