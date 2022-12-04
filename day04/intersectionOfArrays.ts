export default function intersectionOfArrays(a: string[], b: string[]) {
  let short = a;
  let long = b;
  if (short.length > long.length) {
    short = b;
    long = a;
  }
  const matches = new Set();
  for (let s = 0; s < short.length; s++) {
    for (let l = 0; l < long.length; l++) {
      if (short[s] === long[l]) {
        matches.add(short[s]);
        break;
      }
    }
  }
  return [...matches];
}
