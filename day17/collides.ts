export default function collides(a: Map<string, boolean>, b: Map<string, boolean>) {
  let found = false;
  for (let [key] of a) {
    const point = key.split(',').map(Number);
    if (point[0] < 0 || point[0] > 6 || b.get(key)) {
      found = true;
      break;
    }
  }
  /*
  const numericA = a.map(point => point.split(',').map(Number));
  for (let indexA = 0; indexA < a.length; indexA++) {
    if (numericA[indexA][0] < 0 || numericA[indexA][0] > 6 || b.includes(a[indexA])) {
      found = true;
      break;
    }
  }
   */
  return found;
}
