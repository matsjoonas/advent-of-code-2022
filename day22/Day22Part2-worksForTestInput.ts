import Day from "../Day";
import Logger from "../util/Logger";
import rotateClockwise from "../util/rotateClockwise";

export default class Day22Part2 implements Day {
  public solve(rawInput: string): number {
    const logger = new Logger();
    // logger.turnOff();
    const input = rawInput.split(/\r\n\r\n|\n\n/);
    const map = input[0].split(/\r\n|\n/)
      .map(item => item.split('').map(tile => tile === ' ' ? undefined : tile));

    logger.log(map[map.length - 1]);
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
        logger.log('sideLength', sideLength);
        logger.log('point[1]', point[1]);
        logger.log('point[0]', point[0]);
        logger.log('xSection', xSection);
        logger.log('ySection', ySection);
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
    for (let x = 0; x < map[map.length - 1].length; x++) {
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
        for (let step = 0; step < Number(instruction); step++) {
          const currentDirection = directions[directionIndex];
          let newDirectionIndex = directionIndex;
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
            let targetSide = soloSides[6];
            if (currentSide === 1) {
              targetSide = rotateClockwise(soloSides[6], 2);
              newDirectionIndex = 2;
            } else if (currentSide === 4) {
              targetSide = rotateClockwise(soloSides[6], 3);
              newDirectionIndex = 1;
            } else if (currentSide === 6) {
              targetSide = rotateClockwise(soloSides[1], 2);
              newDirectionIndex = 2;
            } else {
              throw new Error('Going in over the edge in > direction on other sides is not possible');
            }
            nextPos = [...targetSide[playerPosition[0] % sideLength][0]];
          } else if (nextPos[1] < xLimit[0]) {
            let targetSide = soloSides[1];
            if (currentSide === 1) {
              targetSide = rotateClockwise(soloSides[3]);
              newDirectionIndex = 1;
            } else if (currentSide === 2) {
              targetSide = rotateClockwise(soloSides[6], 3);
              newDirectionIndex = 3;
            } else if (currentSide === 5) {
              targetSide = rotateClockwise(soloSides[3], 3);
              newDirectionIndex = 3;
            } else {
              throw new Error('Going over the edge in < direction on other sides is not possible');
            }
            nextPos = [...targetSide[playerPosition[0] % sideLength][targetSide[0].length - 1]];
          }
          // > 0, v 1, < 2, ^ 3
          if (nextPos[0] > yLimit[1]) {
            let targetSide = soloSides[6];
            if (currentSide === 2) {
              targetSide = rotateClockwise(soloSides[5], 2);
              newDirectionIndex = 3;
            } else if (currentSide === 3) {
              targetSide = rotateClockwise(soloSides[5]);
              newDirectionIndex = 0;
            } else if (currentSide === 5) {
              targetSide = rotateClockwise(soloSides[2], 2);
              newDirectionIndex = 3;
            } else if (currentSide === 6) {
              targetSide = rotateClockwise(soloSides[2]);
              newDirectionIndex = 0;
            } else {
              throw new Error('Going in over the edge in v direction on other sides is not possible');
            }
            nextPos = [...targetSide[0][playerPosition[1] % sideLength]];
          } else if (nextPos[0] < yLimit[0]) {
            let targetSide = soloSides[6];
            if (currentSide === 2) {
              targetSide = rotateClockwise(soloSides[1], 2);
              newDirectionIndex = 1;
            } else if (currentSide === 3) {
              targetSide = rotateClockwise(soloSides[1], 3);
              newDirectionIndex = 0;
            } else if (currentSide === 1) {
              targetSide = rotateClockwise(soloSides[2], 2);
              newDirectionIndex = 1;
            } else if (currentSide === 6) {
              targetSide = rotateClockwise(soloSides[4]);
              newDirectionIndex = 2;
            } else {
              throw new Error('Going in over the edge in ^ direction on other sides is not possible');
            }
            nextPos = [...targetSide[targetSide.length - 1][playerPosition[1] % sideLength]];
          }

          logger.log('corrected nextPos:', nextPos);
          logger.log('newDirection', directions[newDirectionIndex]);
          let nextTile = map[nextPos[0]][nextPos[1]];
          logger.log('nextTile:', nextTile);
          if (nextTile === '#') {
            // blocked, no point in trying to move in this direction
            break;
          }
          playerPosition = [...nextPos];
          directionIndex = newDirectionIndex;
        }
      }
    });

    return 1000 * (playerPosition[0] + 1) + 4 * (playerPosition[1] + 1) + directionIndex;
  }
}
