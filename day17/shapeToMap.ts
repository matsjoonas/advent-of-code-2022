export default function shapeToMap(shape: number[][]) {
  const map = new Map();
  shape.map(point => point.join(',')).forEach(point => {
    map.set(point, true);
  });
  return map;
}
