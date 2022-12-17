export default function collides(a: string[], b: string[]) {
  let found = false;
  const numericA = a.map(point => point.split(',').map(Number));
  for (let indexA = 0; indexA < a.length; indexA++) {
    if (numericA[indexA][0] < 0 || numericA[indexA][0] > 6 || b.includes(a[indexA])) {
      found = true;
      break;
    }
  }
  return found;
}
