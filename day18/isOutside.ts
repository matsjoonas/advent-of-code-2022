import {Extremes} from "./Extremes";

export default function isOutside(cubeToCheck: number[], extremes: Extremes) {
  let result = false;
  cubeToCheck.forEach((coord, index) => {
    if ((coord > extremes.high[index] + 1) || (coord < extremes.low[index] - 1)) {
      result = true;
    }
  });
  return result;
}
