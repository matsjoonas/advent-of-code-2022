import Day from "../Day";
import Logger from "../util/Logger";
import frame from "./frame";
import HiveMind from "./HiveMind";

const directions = [
  {
    name: 'N',
    d: [-1, 0],
  },
  {
    name: 'NE',
    d: [-1, 1],
  },
  {
    name: 'E',
    d: [0, 1],
  },
  {
    name: 'SE',
    d: [1, 1], // SE
  },
  {
    name: 'S',
    d: [1, 0], // S
  },
  {
    name: 'SW',
    d: [1, -1], // SW
  },
  {
    name: 'W',
    d: [0, -1], // W
  },
  {
    name: 'NW',
    d: [-1, -1], // NW
  },
];

function arrToKey(arr: number[]) {
  return arr.join(',');
}

export default class Day23Part2 implements Day {
  public solve(rawInput: string): number {
    const logger = new Logger();
    logger.turnOff();
    const input = rawInput.trim().split(/\r\n|\n/).map(line => line.split(''));
    const hiveMind = new HiveMind();

    let elves: number[][] = [];

    input.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile === '#') {
          elves.push([y,x]);
        }
      });
    });
    function round() {
      let byPosition = new Map();
      elves.forEach(([y,x]) => {
        byPosition.set([y,x].join(','), true);
      });
      logger.log('-------- ROUND ---------');
      logger.log('byPosition', byPosition);
      const proposedPositions = new Map();
      elves.forEach(elf => {
        let blockedDirs: string[] = [];
        logger.log('--------- ELF', elf, '------------');
        directions.forEach(direction => {
          const lookPosition = [elf[0] + direction.d[0], elf[1] + direction.d[1]];
          if (byPosition.get(lookPosition.join(','))) {
            blockedDirs.push(direction.name);
          }
        });

        // no other elves nearby, do nothing
        if (blockedDirs.length === 0) {
          return;
        }

        let proposedDirection = hiveMind.proposeDirection(blockedDirs);

        if (!proposedDirection) {
          // no valid directions
          return;
        }

        logger.log('proposedDirection', proposedDirection);
        const chosenDirection = directions.find(direction => direction.name === proposedDirection);
        if (!chosenDirection) {
          throw new Error('Could not find a matching direction');
        }
        const proposedPos = [elf[0] + chosenDirection.d[0], elf[1] + chosenDirection.d[1]];
        logger.log('proposedPos', proposedPos);
        byPosition.set(arrToKey(elf), proposedPos);
        const posKey = arrToKey(proposedPos);
        if (proposedPositions.get(posKey)) {
          proposedPositions.set(posKey, proposedPositions.get(posKey) + 1);
        } else {
          proposedPositions.set(posKey, 1);
        }

        logger.log('blockedDirs', blockedDirs);

      });

      logger.log('proposedPositions', proposedPositions);
      const newElves = elves.map(elf => {
        const elfKey = arrToKey(elf);
        const proposedPos = byPosition.get(elfKey);
        if (!Array.isArray(proposedPos)) {
          return [...elf];
        }
        const count = proposedPositions.get(arrToKey(proposedPos));
        if (count === 1) {
          return [...proposedPos];
        } else {
          return [...elf];
        }
      });

      elves = [...newElves];
      hiveMind.increment();
    }

    let counter = 1;

    let lastFrame = '';
    while (true) {
      round();
      const nextFrame = frame(elves).map(row => row.join('')).join('');
      if (nextFrame === lastFrame) {
        break;
      }
      lastFrame = nextFrame;
      counter++;
    }

    return counter;
  }
}
