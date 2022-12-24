import directions from "./directions";
import {BlizPos} from "./BlizPos";

export default function nextPosition(grid: string[][], blizPos: BlizPos): BlizPos {
  const [thisPoint, direction] = blizPos;
  const modifier: number[] = directions[direction];
  if (!modifier) {
    throw new Error('This direction does not exist, direction provided: ' + direction);
  }

  let nextPosition = [thisPoint[0] + modifier[0], thisPoint[1] + modifier[1]];


  if (nextPosition[0] >= grid.length - 1) {
    nextPosition[0] = 1; // start again from the top, don't forget, row 0 is all #
  }
  if (nextPosition[0] <= 0) {
    nextPosition[0] = grid.length - 2; // start again from the bottom, don't forget, last row is all #
  }
  if (nextPosition[1] >= grid[0].length - 1) { // greater or equal to the last tile
    nextPosition[1] = 1; // start again from the left, don't forget, left side is all '#
  }
  if (nextPosition[1] <= 0) {
    nextPosition[1] = grid[0].length - 2; // start again from the right side
  }

  return [[nextPosition[0], nextPosition[1]], direction];
}
