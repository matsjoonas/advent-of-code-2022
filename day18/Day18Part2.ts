import Day from "../Day";
import getAdjacentSpots from "./getAdjacentSpots";
import isOutside from "./isOutside";
import getExtremes from "./getExtremes";

function toCube(str: string) {
  return str.split(',').map(Number);
}

function cubeToString(cube: number[]) {
  return cube.join(',');
}

export default class Day18Part2 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/);

    const cubeMap = new Map();
    const cubeArr = input.map(toCube);
    cubeArr.forEach(cube => {
      cubeMap.set(cubeToString(cube), true);
    });
    const extremes = getExtremes(cubeArr);
    let queue = [extremes.high];
    let visited: Set<string> = new Set();
    while (true) {
      let currentSpot = queue.pop();
      if (!currentSpot) {
        break;
      }
      const currentSpotString = cubeToString(currentSpot);
      visited.add(currentSpotString);
      const newFoundAirCubes = getAdjacentSpots(currentSpot)
        .filter(spot => {
          const cubeString = cubeToString(spot);
          return !cubeMap.get(cubeString) && !visited.has(cubeString) && !isOutside(spot, extremes);
        });
      queue = [...queue, ...newFoundAirCubes];
    }

    let surfaceArea = 0;

    visited.forEach(cubeString => {
      const cube = toCube(cubeString);
      const adjCubes = getAdjacentSpots(cube)
        .filter(spot => {
          return cubeMap.get(cubeToString(spot));
        });

      surfaceArea += adjCubes.length;
    });

    return surfaceArea;
  }
}
