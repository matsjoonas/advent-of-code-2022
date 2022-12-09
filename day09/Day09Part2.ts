import Day from "../Day";

function getLinkPosition(sHead: number[], sTail: number[]): number[] {
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

function move(links: number[][], command: string[], tailPositions: number[][]) {
  const direction = command[0];
  const distance = Number(command[1]);
  const head = links[0];
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
    for (let linkIndex = 1; linkIndex < links.length; linkIndex++) {
      const newLinkPosition = getLinkPosition(links[linkIndex - 1], links[linkIndex]);
      links[linkIndex] = newLinkPosition;
      if (linkIndex === links.length - 1) {
        tailPositions.push(newLinkPosition);
      }
    }
  }

  return links;
}

export default class Day09Part2 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/);
    const ropeLength = 10;
    let links: number[][] = [];
    for (let l = 0; l < ropeLength; l++) {
      links.push([0, 0]);
    }

    const tailPositions: number[][] = [];

    for (let i = 0; i < input.length; i++) {
      links = [...move(links, input[i].split(' '), tailPositions)];
    }

    const allPositions = tailPositions.map(pos => pos.join(','));
    console.log(allPositions);
    const uniquePositions = [...new Set(allPositions)];
    console.log(uniquePositions);
    return uniquePositions.length;
  }
}
