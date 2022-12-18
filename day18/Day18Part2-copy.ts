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


function createOutsideChecker(cubeArr: number[][]) {
  const highest = [0, 0, 0];
  const lowest = [0, 0, 0];
  cubeArr.forEach(cube => {
    cube.forEach((coord, index) => {
      if (coord > 0) {
        if (coord > highest[index]) {
          highest[index] = coord;
        }
      }
      if (coord < 0) {
        if (coord < lowest[index]) {
          lowest[index] = coord;
        }
      }
    });
  });

  function isOutside(cubeToCheck: number[]) {
    let result = false;
    cubeToCheck.forEach((coord, index) => {
      if (coord > highest[index] || coord < lowest[index]) {
        result = true;
      }
    });
    return result;
  }

  return isOutside;
}

export default class Day18Part2 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/);

    const cubeMap = new Map();
    const cubeArr = input.map(toCube);
    cubeArr.forEach(cube => {
      cubeMap.set(cubeToString(cube), true);
    });

    const isOutside = createOutsideChecker(cubeArr);

    let surfaceArea = 0;

    let freedAdjSpots: number[][] = [];
    cubeArr.forEach(cube => {
      freedAdjSpots = getAdjacentSpots(cube)
        .filter(spot => {
          return !cubeMap.get(cubeToString(spot));
        });

      surfaceArea += freedAdjSpots.length;
    });

    let outsideSpots: Set<string> = new Set();
    let insideSpots: Set<string> = new Set();

    freedAdjSpots.forEach(spot => {
      let queue = [spot];
      let visited: Set<string> = new Set();
      let connectedToOutside = false;
      while(true) {
        let currentSpot = queue.pop();
        if (!currentSpot) {
          break;
        }
        const currentSpotString = cubeToString(currentSpot);
        visited.add(currentSpotString);
        if (isOutside(currentSpot) || outsideSpots.has(currentSpotString)) {
          connectedToOutside = true;
          break;
        }
        const newFoundAirCubes = getAdjacentSpots(currentSpot)
          .filter(spot => {
            const cubeString = cubeToString(spot);
            return !cubeMap.get(cubeString) && !visited.has(cubeString);
          });
        queue = [...queue, ...newFoundAirCubes];
      }
      if (connectedToOutside) {
        // if outside then all the so far visited spots have to be outside
        outsideSpots = new Set([...outsideSpots, ...visited]);
      } else {
        insideSpots = new Set([...insideSpots, ...visited]);
      }
    });

    const insideSpotsArr: string[] = Array.from(insideSpots) || [];
    // find all the unique cubes that each inside spot touches
    // divide the found amount from total surface area
    let cubeSidesTouched: number[][] = [];
    insideSpotsArr.forEach((insideSpotString: string) => {
      const insideSpot = toCube(insideSpotString);
      const cubesTouched = getAdjacentSpots(insideSpot)
        .filter(spot => {
          return cubeMap.get(cubeToString(spot));
        });
      cubeSidesTouched = [...cubeSidesTouched, ...cubesTouched];
    });

    return surfaceArea - cubeSidesTouched.length;
  }
}
