import Day from "../Day";
import parseInput from "./parseInput";

function stateKey(state: { robots: number[]; materials: number[]; timeLeft: number; }) {
  return state.robots.join(',') + '|' + state.materials.join(',') + '|' + state.timeLeft;
}

function maxGeodes(blueprint: number[][]) {
  const maxResourcesNeeded = [0, 0, 0, Infinity];
  blueprint.forEach((costs) => {
    costs.forEach((cost, i) => {
      if (cost > maxResourcesNeeded[i]) {
        maxResourcesNeeded[i] = cost;
      }
    });
  });

  let queue = [
    {
      robots: [1, 0, 0, 0], // ore, clay, obsidian, geode
      materials: [0, 0, 0, 0], // ore, clay, obsidian, geode
      timeLeft: 32,
    }
  ];

  const seen = new Map();

  let maxGeodes = 0;
  const maxGeodesForTime = [];

  let i = 0;
  while (true) {
    i++;
    const thisState = queue.pop();
    if (!thisState) {
      break;
    }

    if (thisState.materials[3] > maxGeodes) {
      maxGeodes = thisState.materials[3];
    }

    if (thisState.timeLeft <= 0) {
      continue;
    }

    let rg: number = maxGeodesForTime[thisState.timeLeft];
    if (rg === undefined) {
      rg = 0;
      for (let m = 1; m <= thisState.timeLeft; m++) {
        rg += m * (thisState.timeLeft - m);
      }
      maxGeodesForTime[thisState.timeLeft] = rg;
    }

    const theoreticalMax = thisState.robots[3] * thisState.timeLeft + thisState.materials[3] + rg;
    if (theoreticalMax <= maxGeodes) {
      continue;
    }

    let newStates = [];

    for (let r = 3; r >= 0; r--) {
      let buildThisRobot = false;
      // Should we and can we build the robot
      if (thisState.robots[r] < maxResourcesNeeded[r] && thisState.materials[r] < (maxResourcesNeeded[r] + 1)) {
        // Max resource production for this type of robot is not yet reached
        // We can try building another robot of this type
        // Check whether we have enough resources
        if (thisState.materials[0] >= blueprint[r][0] &&
          thisState.materials[1] >= blueprint[r][1] &&
          thisState.materials[2] >= blueprint[r][2]) {
          buildThisRobot = true;
        }
      }

      if (buildThisRobot) {
        let newState = {
          ...thisState,
        }
        newState.robots = [...thisState.robots];
        newState.materials = [...thisState.materials];
        // Update resources
        thisState.robots.forEach((robotCount, i) => {
          newState.materials[i] += robotCount;
        });

        newState.robots[r]++;
        // reduce materials
        newState.materials[0] -= blueprint[r][0];
        newState.materials[1] -= blueprint[r][1];
        newState.materials[2] -= blueprint[r][2];

        newState.timeLeft--;
        const key = stateKey(newState);
        if (!seen.get(key)) {
          seen.set(key, true);
          newStates.push(newState);
        }
      }
    }

    // cover the case where we didn't build any robots
    let newState = {
      ...thisState,
    }
    newState.robots = [...thisState.robots];
    newState.materials = [...thisState.materials];
    // Update resources
    thisState.robots.forEach((robotCount, i) => {
      newState.materials[i] += robotCount;
    });
    newState.timeLeft--;
    const key = stateKey(newState);
    if (!seen.get(key)) {
      seen.set(key, true);
      newStates.push(newState);
    }

    queue = [...queue, ...newStates];
  }

  return maxGeodes;
}

export default class Day19Part2 implements Day {
  public solve(rawInput: string): number {
    const blueprints = parseInput(rawInput).slice(0, 3);

    return blueprints
      .map(maxGeodes)
      .reduce((acc, cur) => acc * cur, 1);
  }
}
