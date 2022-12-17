import Day from "../Day";

function translate(shape: number[][], x: number, y: number) {
  return shape.map(point => [point[0] + x, point[1] + y]);
}

function shapesCollide(a: number[][], b: number[][]) {
  const index = a.findIndex(pointA => {
    let found = false;
    for (let i = 0; i < b.length; i++) {
      if (pointA[0] === b[i][0] || pointA[1] === b[i][1]) {
        found = true;
        break;
      }
    }
    return found;
  });

  return index !== -1;
}

class RockGenerator {
  private counter = 0;

  private shapes = [
    [
      [0, 0], [1, 0], [2, 0], [3, 0],
    ],
    [
      [1, 0], [0, 1], [1, 1], [2, 1], [1, 2],
    ],
    [
      [0, 0], [1, 0], [2, 0], [2, 1], [2, 2],
    ],
    [
      [0, 0], [0, 1], [0, 2], [0, 3],
    ],
    [
      [0, 0], [1, 0], [0, 1], [1, 1]
    ],
  ];

  public emit() {
    const shape = this.shapes[this.counter];
    this.counter++;
    if (this.counter > 4) {
      this.counter = 0;
    }
    return shape;
  }
}

export default class Day17Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split('');
    const rockGenerator = new RockGenerator();
    console.log(shapesCollide(rockGenerator.emit(), rockGenerator.emit()));

    return 0;
  }
}
