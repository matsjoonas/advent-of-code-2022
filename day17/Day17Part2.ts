import Day from "../Day";
import ShapeGenerator from "./ShapeGenerator";
import collides from "./collides";
import translateShape from "./translateShape";
import shapeToString from "./shapeToString";
import shapeToMap from "./shapeToMap";
import renderShape from "./renderShape";

export default class Day17Part2 implements Day {
  public solve(rawInput: string): number {
    const jetPattern = rawInput.trim().split('');
    // Store large shape points as strings for faster processing
    let floorShape = shapeToMap([
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]
    ]);
    let highestY = 0;
    const rockGenerator = new ShapeGenerator();
    let jetCounter = 0;
    let i = 2022;
    while(i--) {
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

      floorShape = new Map([...floorShape, ...shapeToMap(rock)]);
      const rockHighestY = rock.sort((a, b) => b[1] - a[1])[0][1];
      highestY = highestY > rockHighestY ? highestY : rockHighestY;
      // find the new floor

      /*
      renderShape(floorShape);
      console.log('                 ');
      */
    }

    return highestY;
  }
}
