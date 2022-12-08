import Day from "../Day";

function scenicScoreFromDirection(grid: number[][], sx: number, sy: number, direction: string) {
  let run = true;
  let x = sx;
  let y = sy;
  let score = 0;
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
      score++;
      break;
    }
    score++;
  }

  return score;
}

export default class Day08Part2 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/).map(l => l.split('').map(Number));

    let counter = 0;
    const directions = ['N', 'E', 'W', 'S'];
    let highestScore = 0;
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        let isVisible = false;
        let score = 1;
        for (let i = 0; i < directions.length; i++) {
          score *= scenicScoreFromDirection(input, x, y, directions[i]);
        }
        if (score > highestScore) {
          highestScore = score;
        }

        if (isVisible) {
          counter++;
        }
      }
    }

    return highestScore;
  }
}
