import Day from "../Day";
import Logger from "../util/Logger";

export default class Day22Part2 implements Day {
  public solve(rawInput: string): number {
    const logger = new Logger();
    // logger.turnOff();
    const input = rawInput.split(/\r\n\r\n|\n\n/);
    const map = input[0].split(/\r\n|\n/)
      .map(item => item.split('').map(tile => tile === ' ' ? undefined : tile));

    const sideLength = map.length / 3;
    const soloSides: number[][][][] = [];
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] !== undefined) {
          const side = getSide([y, x]);
          if (!soloSides[side]) {
            soloSides[side] = [];
          }
          const originalCoords = [y, x];
          const localY = y % sideLength;
          const localX = x % sideLength;

          if (!soloSides[side][localY]) {
            soloSides[side][localY] = [];
          }
          soloSides[side][localY][localX] = originalCoords;
        }
      }
    }


    function getSide(point: number[]) {
      const sides: {} = {
        'x3y1': 1,
        'x1y2': 2,
        'x2y2': 3,
        'x3y2': 4,
        'x3y3': 5,
        'x4y3': 6,
      };
      const xSection = Math.floor(point[1] / sideLength) + 1;
      const ySection = Math.floor(point[0] / sideLength) + 1;
      // @ts-ignore
      const side = sides['x' + xSection + 'y' + ySection];
      if (side === undefined) {
        throw new Error('INVALID SIDE');
      }
      return side;
    }

    const instructions = input[1].trim()
      .replaceAll('L', '|L|')
      .replaceAll('R', '|R|')
      .split('|');

    let xLimits: number[][] = [];
    map.forEach(row => {
      const start = row.findIndex(tile => !!tile);
      let end = [...row].reverse().findIndex(tile => !!tile);
      end = row.length - 1 - end;
      xLimits.push([start, end]);
    });

    let yLimits: number[][] = [];
    for (let x = 0; x < map[0].length; x++) {
      let start = -1;
      let end = -1;
      for (let y = 0; y < map.length; y++) {
        const tile = map[y][x];
        if (tile) {
          if (start !== -1) {
            end = y;
          } else {
            start = y;
          }
        }
      }
      yLimits.push([start, end]);
    }

    let playerPosition = [0, map[0].findIndex(tile => tile === '.')];

    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // > 0, v 1, < 2, ^ 3
    let directionIndex = 0;
    instructions.forEach(instruction => {
      logger.log(`--------- INSTRUCTION: ${instruction} ------------`);
      if (instruction === 'L') {
        directionIndex--;
        if (directionIndex < 0) {
          directionIndex = directions.length - 1;
        }
      } else if (instruction === 'R') {
        directionIndex++;
        if (directionIndex > (directions.length - 1)) {
          directionIndex = 0;
        }
      } else {
        const currentDirection = directions[directionIndex];
        for (let step = 0; step < Number(instruction); step++) {
          logger.log(`------- STEP: ${step} ----------`);
          logger.log('direction: ', currentDirection);
          let nextPos = [playerPosition[0] + currentDirection[0], playerPosition[1] + currentDirection[1]];
          logger.log('nextPos:', nextPos);
          const xLimit = xLimits[playerPosition[0]];
          const yLimit = yLimits[playerPosition[1]];
          logger.log('xLimit:', xLimit);
          logger.log('yLimit:', yLimit);

          const currentSide = getSide(playerPosition);

          if (nextPos[1] > xLimit[1]) {
            nextPos[1] = xLimit[0];
          } else if (nextPos[1] < xLimit[0]) {
            nextPos[1] = xLimit[1];
          }

          if (nextPos[0] > yLimit[1]) {
            nextPos[0] = yLimit[0];
          } else if (nextPos[0] < yLimit[0]) {
            nextPos[0] = yLimit[1];
          }

          logger.log('corrected nextPos:', nextPos);
          let nextTile = map[nextPos[0]][nextPos[1]];
          logger.log('nextTile:', nextTile);
          if (nextTile === '#') {
            // blocked, no point in trying to move in this direction
            break;
          }
          playerPosition = [...nextPos];
        }
      }
    });

    return 1000 * (playerPosition[0] + 1) + 4 * (playerPosition[1] + 1) + directionIndex;
  }
}
