import Day from "../Day";

function moveSand(caveMap: Map<string, boolean>, lowerBound: number) {
  const sandPosition = [500, 0];
  const moves = [
    [0, 1],
    [-1, 1],
    [1, 1],
  ];
  let isBlocked = false;
  let currentSandPosition = [...sandPosition];
  while(!isBlocked) {
    for (let m = 0; m < moves.length; m++) {
      const move = moves[m];
      const nextSandPosition = [currentSandPosition[0] + move[0], currentSandPosition[1] + move[1]];
      const key = nextSandPosition.join(',');
      if (!caveMap.get(key)) {
        currentSandPosition = [...nextSandPosition];
        break;
      }
      if (m === moves.length - 1) {
        // could not find next position, we are blocked
        isBlocked = true;
      }
    }

    if (currentSandPosition[1] > lowerBound) {
      currentSandPosition = [-9999, -9999];
      isBlocked = true;
      break;
    }
  }
  return currentSandPosition;
}

export default class Day14Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/)
      .map(line => line.split(' -> ').map(item => item.split(',').map(Number)));
    const caveMap = new Map();
    input.forEach(line => {
      line.forEach((joint, index) => {
        caveMap.set(joint.join(','), true);
        const nextJoint = line[index + 1];
        if (!nextJoint) {
          return;
        }

        const delta = [nextJoint[0] - joint[0], nextJoint[1] - joint[1]];
        delta.forEach((direction, index) => {
          let modifier = 1;
          if (direction < 0) {
            modifier = -1;
          }
          let counter = 0;
          while (direction !== counter) {
            const newJoint = [...joint];
            newJoint[index] += counter;
            caveMap.set(newJoint.join(','), true);
            counter += modifier;
          }
        });
      });
    });

    let full = false;
    const restingPoints = [];
    while (!full) {
      const restingPoint = moveSand(caveMap, 9999);
      if (restingPoint[0] === -9999) {
        full = true;
        break;
      }
      restingPoints.push(restingPoint);
      caveMap.set(restingPoint.join(','), true);
    }

    return restingPoints.length;
  }
}
