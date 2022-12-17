import Day from "../Day";
import ShapeGenerator from "./ShapeGenerator";
import collides from "./collides";
import translateShape from "./translateShape";
import shapeToMap from "./shapeToMap";
import renderShape from "./renderShape";

function sum(a: number, b: number) {
  return a + b;
}

export default class Day17Part2 implements Day {
  public solve(rawInput: string): number {
    const jetPattern = rawInput.trim().split('');
    // Store large shape points as strings for faster processing
    let floorShape = shapeToMap([
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]
    ]);
    const heightDeltas: number[] = [];
    let highestY = 0;
    const rockGenerator = new ShapeGenerator();
    let jetCounter = 0;
    let cycleLength = 0;
    let sumOfHeightsPerCycle = 0;
    let sumOfHeightsBeforeCycle = 0;
    let cyclePattern: number[] = [];
    let cycleStartIndex = 0;
    let iteration = 0;
    while(cycleLength === 0) {
      let rock = translateShape(rockGenerator.emit(), 2, highestY + 4);
      while (true) {
        const jet = jetPattern[jetCounter % jetPattern.length];
        jetCounter++;
        let xMovedRock: number[][] = [];
        if (jet === '<') {
          xMovedRock = translateShape(rock, -1, 0);
        } else if (jet === '>') {
          xMovedRock = translateShape(rock, 1, 0);
        }
        if (collides(shapeToMap(xMovedRock), floorShape)) {
          // undo the movement in case of collision
          xMovedRock = [...rock];
        }
        let yMovedRock = translateShape(xMovedRock, 0, -1);
        if (collides(shapeToMap(yMovedRock), floorShape)) {
          // undo the movement in case of collision
          rock = xMovedRock;
          break;
        }
        rock = yMovedRock;
      }

      let floorShapeArray = [...floorShape, ...shapeToMap(rock)];

      floorShape = new Map([...floorShapeArray]);
      const rockHighestY = rock.sort((a, b) => b[1] - a[1])[0][1];
      const newHighestY = highestY > rockHighestY ? highestY : rockHighestY;
      heightDeltas.push(newHighestY - highestY);

      if (heightDeltas.length > 60) {
        const substring = heightDeltas.slice(heightDeltas.length - 30).join('');
        cycleStartIndex = heightDeltas.slice(0, heightDeltas.length - 30).join('').indexOf(substring);
        if (cycleStartIndex !== -1 && !cycleLength) {
          cycleLength = heightDeltas.length - cycleStartIndex - 30;
          sumOfHeightsBeforeCycle = heightDeltas
            .slice(0, cycleStartIndex)
            .reduce(sum, 0);
          cyclePattern = heightDeltas.slice(cycleStartIndex, cycleStartIndex + cycleLength);
          sumOfHeightsPerCycle = cyclePattern.reduce(sum, 0);
        }
      }
      highestY = newHighestY;
      iteration++;
    }

    const rounds = 1000000000000;
    const noOfCycles = Math.floor((rounds - cycleStartIndex) / cycleLength);
    const leftOverRounds = rounds - cycleStartIndex - (noOfCycles * cycleLength);
    const leftOverSum = cyclePattern.slice(0, leftOverRounds).reduce(sum, 0);


    return sumOfHeightsBeforeCycle + leftOverSum + (noOfCycles * sumOfHeightsPerCycle);
  }
}
