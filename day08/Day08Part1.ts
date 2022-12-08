import Day from "../Day";

function visibleFromDirection(grid: number[][], sx: number, sy: number, direction: string) {
  let run = true;
  let isVisible = true;
  let x = sx;
  let y = sy;
  while(run) {
    if (direction === 'N') {
      y--;
    } else if (direction === 'S') {
      y++
    } else if (direction === 'E') {
      x++
    }
    else if (direction === 'W') {
      x--
    }

    if (grid[y] === undefined) {
      break;
    }
    const nextTree = grid[y][x];

    if (nextTree === undefined) {
      break;
    }

    if (nextTree >= grid[sy][sx]) {
      isVisible = false;
      break;
    }
  }

  return isVisible;
}

export default class Day08Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/).map(l => l.split('').map(Number));

    let counter = 0;
    const directions = ['N', 'E', 'W', 'S'];
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        let isVisible = false;
        for (let i = 0; i < directions.length; i++) {
          if (visibleFromDirection(input, x, y, directions[i])) {
            isVisible = true;
            break;
          }
        }


        if (isVisible) {
          counter++;
        }
      }
    }

    return counter;
  }
}
