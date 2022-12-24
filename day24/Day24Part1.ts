import Day from "../Day";
import nextPosition from "./nextPosition";
import Logger from "../util/Logger";
import {BlizPos} from "./BlizPos";
import render from "./render";

export default class Day24Part1 implements Day {
  public solve(rawInput: string): number {
    const logger = new Logger();
    logger.turnOff();
    let input = rawInput.trim()
      .split(/\r\n|\n/)
      .map(line => line.split(''));

    // Get initial blizzard positions
    let startingBlizPositions: BlizPos[] = [];
    input.forEach((line, y) => {
      line.forEach((tile, x) => {
        if ('^>v<'.includes(tile)) {
          startingBlizPositions.push([[y, x], tile]);
        }
      });
    })

    logger.log(render(startingBlizPositions, new Set(['0,1']), input[0].length, input.length));

    const blizCacheByStep = [
      startingBlizPositions,
    ];

    let playerPositions = new Set(['0,1']);

    let found = false;
    let step = 1;
    while (!found) {
      logger.log('------', step, '------');
      logger.log('current playerPositions', playerPositions);
      if (!blizCacheByStep[step]) {
        // if no cached blizState for the step, create one from the previous step
        blizCacheByStep[step] = blizCacheByStep[step - 1].map(currentPos => nextPosition(input, currentPos));
      }
      const blizMap = new Map(blizCacheByStep[step].map(blizPos => [blizPos[0].join(','), true]));

      // find all possible next positions
      let nextPlayerPositions: number[][] = [];
      playerPositions.forEach(playerPosString => {
        const playerPos = playerPosString.split(',').map(Number);
        if (!blizMap.get(playerPos.join(','))) {
          nextPlayerPositions.push(playerPos); // We can also wait, this covers that
        }
        [[-1, 0], [0, 1], [1, 0], [0, -1]].forEach(direction => {
          const nextPosition = [playerPos[0] + direction[0], playerPos[1] + direction[1]];

          if (!blizMap.get(nextPosition.join(','))) {
            // No blizzards, free to move
            if (nextPosition[0] === input.length - 1 && nextPosition[1] === input[0].length - 2) {
              // this is the exit;
              found = true;
            }
            if (nextPosition[0] < input.length - 1
              && nextPosition[0] > 0
              && nextPosition[1] > 0
              && nextPosition[1] < input[0].length - 1
            ) {
              nextPlayerPositions.push(nextPosition)
            }
          }
        });
      });
      playerPositions = new Set([...nextPlayerPositions.map(pos => pos.join(','))]);
      logger.log('next player positions', playerPositions);
      logger.log(render(blizCacheByStep[step], playerPositions, input[0].length, input.length));

      step++;
    }

    return step - 1;
  }
}
