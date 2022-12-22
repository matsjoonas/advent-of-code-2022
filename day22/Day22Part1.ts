import Day from "../Day";

export default class Day22Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.split(/\r\n\r\n|\n\n/);
    const map = input[0].split(/\r\n|\n/)
      .map(item => item.split('').map(tile => tile === ' ' ? undefined : tile));

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

    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let directionIndex = 0;
    instructions.forEach(instruction => {
      //console.log('instruction', instruction);
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
          //console.log('------------------');
          let nextPos = [playerPosition[0] + currentDirection[0], playerPosition[1] + currentDirection[1]];
          //console.log('nextPos', nextPos);
          const xLimit = xLimits[playerPosition[0]];
          const yLimit = yLimits[playerPosition[1]];
          //console.log('xLimit', xLimit);
          //console.log('yLimit', yLimit);

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

          //console.log(nextPos[0], nextPos[1]);
          let nextTile = map[nextPos[0]][nextPos[1]];
          //console.log('nextTile', nextTile);
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
