import Day from "../Day";
import Logger from "../util/Logger";

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


const directionGroups = [
  {
    main: [-1, 0], // N
    members: [
      [-1, 0], // N
      [-1, 1], // NE
      [0, 1], // E
    ]
  },
  {
    main: [1, 0], // S
    members: [
      [1, 1], // SE
      [1, 0], // S
      [1, -1], // SW
    ]
  },
  {
    main: [0, -1], // W
    members: [
      [1, -1], // SW
      [0, -1], // W
      [-1, -1], // NW
    ]
  },
  {
    main: [0, 1], // E
    members: [
      [-1, 1], // NE
      [0, 1], // E
      [1, 1], // SE
    ]
  }
];

function arrToKey(arr: number[]) {
  return arr.join(',');
}

export default class Day23Part1 implements Day {
  public solve(rawInput: string): number {
    const logger = new Logger();
    const input = rawInput.trim().split(/\r\n|\n/).map(line => line.split(''));

    let byPosition = new Map();
    let elves: number[][] = [];

    logger.log(input);
    input.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile === '#') {
          byPosition.set([y,x].join(','), null);
          elves.push([y,x]);
        }
      });
    });

    function round() {
      const proposedPositions = new Map();
      elves.forEach(elf => {
        let blockedDirs: string[] = [];
        directions.forEach(direction => {
          const lookPosition = [elf[0] + direction.d[0], elf[1], direction.d[1]];
          if (byPosition.get(lookPosition.join(','))) {
            blockedDirs.push(direction.name);
          }
          if (!blockedDirs) {
            return;
          }
          let proposedDirection = '';
          if (!blockedDirs.includes('N') && !blockedDirs.includes('NE') &&  !blockedDirs.includes('NW')) {
            proposedDirection = 'N';
          } else if (!blockedDirs.includes('S') && !blockedDirs.includes('SE') &&  !blockedDirs.includes('SW')) {
            proposedDirection = 'S';
          } else if (!blockedDirs.includes('W') && !blockedDirs.includes('NW') &&  !blockedDirs.includes('SW')) {
            proposedDirection = 'E';
          } else if (!blockedDirs.includes('E') && !blockedDirs.includes('NE') &&  !blockedDirs.includes('SE')) {
            proposedDirection = 'E';
          }

          if (!proposedDirection) {
            // no valid directions
            return;
          }

          const chosenDirection = directions.find(direction => direction.name === proposedDirection);
          if (!chosenDirection) {
            throw new Error('Could not find a matching direction');
          }
          const proposedPos = [elf[0] + chosenDirection.d[0], elf[0] + chosenDirection.d[0]];
          byPosition.set(arrToKey(elf), proposedPos);
          const posKey = arrToKey(proposedPos);
          if (proposedPositions.get(posKey)) {
            proposedPositions.set(posKey, proposedPositions.get(posKey) + 1);
          } else {
            proposedPositions.set(posKey, 1);
          }
        });
      });

      elves.map(elf => {
        const elfKey = arrToKey(elf);
        const proposedPos = byPosition.get(elfKey);
        const count = proposedPositions.get(arrToKey(proposedPos));
        if (count === 1) {
          return [...proposedPos];
        } else {
          return [...elf];
        }
      });
    }

    let counter = 0;
    console.log(elves);
    while (counter < 3) {
      round();
      console.log(elves);
      counter++;
    }



    return 0;
  }
}
