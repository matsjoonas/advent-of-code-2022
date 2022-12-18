import Day from "../Day";

type Cube = [number, number, number];

function toCube(str: string) {
  return str.split(',').map(Number);
}

function cubeToString(cube: number[]) {
  return cube.join(',');
}

function getAdjacentSpots(point: number[]) {
  const spots = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  return spots.map(spot => {
    return [point[0] + spot[0], point[1] + spot[1], point[2] + spot[2]];
  });
}

export default class Day18Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/);

    const cubeMap = new Map();
    const cubeArr = input.map(toCube);
    cubeArr.forEach(cube => {
      cubeMap.set(cubeToString(cube), true);
    });

    let surfaceArea = 0;

    cubeArr.forEach(cube => {
      const freedAdjSpots = getAdjacentSpots(cube)
        .filter(spot => {
          return !cubeMap.get(cubeToString(spot));
        });

      surfaceArea += freedAdjSpots.length;
    });

    console.log(surfaceArea);
    return 0;
  }
}
