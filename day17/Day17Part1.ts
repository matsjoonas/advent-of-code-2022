import Day from "../Day";

function translate(shape: number[][], x: number, y: number) {
  return shape.map(point => [point[0] + x, point[1] + y]);
}

function collision(a: number[][], b: number[][]) {
  const index = a.findIndex(pointA => {
    if (pointA[0] < 0 || pointA[0] > 6) {
      return true;
    }
    let found = false;
    for (let i = 0; i < b.length; i++) {
      if (pointA[0] === b[i][0] && pointA[1] === b[i][1]) {
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

function renderShape(shape: number[][]) {
  const sortedShape = shape.sort((a, b) => b[1] - a[1]);
  const highestY = sortedShape[0][1] + 1;
  const grid: string[][] = [];
  for (let row = 0; row < highestY; row++) {
    grid.push(['.', '.', '.', '.', '.', '.', '.']);
  }
  sortedShape.forEach(point => {
    const realY = grid.length - 1 - point[1];
    grid[realY][point[0]] = '#';
  });

  console.log(grid.map(row => row.join('')).join('\r\n'));
}

export default class Day17Part1 implements Day {
  public solve(rawInput: string): number {
    const jetPattern = rawInput.trim().split('');
    let floorShape = [
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]
    ];
    let highestY = 0;
    const rockGenerator = new RockGenerator();
    let jetCounter = 0;
    let i = 2022;
    while(i--) {
      let rock = translate(rockGenerator.emit(), 2, highestY + 4);
      while (true) {
        const jet = jetPattern[jetCounter % jetPattern.length];
        jetCounter++;
        let xMovedRock: number[][] = [];
        if (jet === '<') {
          xMovedRock = translate(rock, -1, 0);
        } else if (jet === '>') {
          xMovedRock = translate(rock, 1, 0);
        }
        if (collision(xMovedRock, floorShape)) {
          // undo the movement in case of collision
          xMovedRock = [...rock];
        }
        let yMovedRock = translate(xMovedRock, 0, -1);
        if (collision(yMovedRock, floorShape)) {
          // undo the movement in case of collision
          rock = xMovedRock;
          break;
        }
        rock = yMovedRock;
      }

      floorShape = [...floorShape, ...rock];
      highestY = floorShape.sort((a, b) => b[1] - a[1])[0][1];
      /*
      renderShape(floorShape);
      console.log('                 ');
      */
    }
    
    return highestY;
  }
}
