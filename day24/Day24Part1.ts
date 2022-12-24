import Day from "../Day";
import nextPosition from "./nextPosition";
import Logger from "../util/Logger";
import {BlizPos} from "./BlizPos";
import render from "./render";

export default class Day24Part1 implements Day {
  public solve(rawInput: string): number {
    const logger = new Logger();
    let input = rawInput.trim()
      .split(/\r\n|\n/)
      .map(line => line.split(''));

    let blizPositions: BlizPos[] = [];
    input.forEach((line, y) => {
      line.forEach((tile, x) => {
        if ('^>v<'.includes(tile)) {
          blizPositions.push([[y, x], tile]);
        }
      });
    })

    logger.log(render(blizPositions, [0, 0], input[0].length, input.length));

    const blizCacheByMinute = [];

    // if no cached blizState for the minute, create one
    let newBlizPositions = [];
    newBlizPositions = blizPositions.map(currentPos => nextPosition(input, currentPos));
    newBlizPositions.map(blizPos => blizPos[0].join(','));
    const blizMap = new Map(newBlizPositions);

    logger.log(render(newBlizPositions, [0, 0], input[0].length, input.length));


    /*
    // get new blizzard positions
    for (let y = 0; y < field.length; y++) {
      for (let x = 0; x < field[y].length; x++) {
        if (field[y][x]  ) {

        }
      }
    }
     */

    // state: blizPositions, playerPosition
    // 1. find newBlizPositions
    // 2. get all possible moves for the player considering newBlizPositions
    // 3. create and push a next state to queue, state: blizPositions, playerPosition, minute


    return 0;
  }
}
