import Day from "../Day";

function getTailPosition(sHead: number[], sTail: number[]): number[] {
  let head = [...sHead];
  let tail = [...sTail];
  const deltaX = sHead[0] - sTail[0];
  const deltaY = sHead[1] - sTail[1];
  if (deltaX > 1) {
    tail[0]++;
  } else if (deltaX < -1) {
    tail[0]--;
  }
  if (deltaY > 1) {
    tail[1]++;
  } else if (deltaY < -1) {
    tail[1]--;
  }

  // realign the tail
  if (sTail[1] !== tail[1]) {
    // tail moved on y
    tail[0] = head[0];
  } else if (sTail[0] !== tail[0]) {
    // tail moved on x
    tail[1] = head[1];
  }

  return tail;
}

function move(head: number[], tail: number[], command: string[]) {
  const direction = command[0];
  const distance = Number(command[1]);
  const tailPositions: number[][] = [];
  for (let step = 0; step < distance; step++) {
    if (direction === 'R') {
      head[0] += 1;
    } else if (direction === 'L') {
      head[0] -= 1;
    } else if (direction === 'U') {
      head[1] -= 1;
    } else if (direction === 'D') {
      head[1] += 1;
    }
    const newTailPosition = getTailPosition(head, tail);
    tail[0] = newTailPosition[0];
    tail[1] = newTailPosition[1];
    tailPositions.push([...tail]);
  }

  return tailPositions;
}

export default class Day09Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/);

    let tailPositions: number[][] = [];
    let head = [0, 0];
    let tail = [0, 0];

    for (let i = 0; i < input.length; i++) {
      tailPositions = [...tailPositions, ...move(head, tail, input[i].split(' '))];
    }

    const allPositions = tailPositions.map(pos => pos.join(','));
    console.log(allPositions);
    const uniquePositions = [...new Set(allPositions)];
    console.log(uniquePositions);
    return uniquePositions.length;
  }
}
