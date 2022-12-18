import {Extremes} from "./Extremes";

export default function getExtremes(cubeArr: number[][]): Extremes {
  const high = [0, 0, 0];
  const low = [0, 0, 0];
  cubeArr.forEach(cube => {
    cube.forEach((coord, index) => {
      if (coord > 0) {
        if (coord > high[index]) {
          high[index] = coord;
        }
      }
      if (coord < 0) {
        if (coord < low[index]) {
          low[index] = coord;
        }
      }
    });
  });
  return {
    high,
    low,
  }
}
