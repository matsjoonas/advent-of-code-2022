import Day from "../Day";

function renderLinksFrame(links: number[][]) {
  let lowestX = 0;
  let lowestY = 0;
  let yMod = 0;
  let xMod = 0;
  links.forEach(link => {
    if (link[0] < lowestX) {
      lowestX = link[0];
    }
    if (link[1] < lowestY) {
      lowestY = link[1];
    }
  });
  if (lowestY < 0) {
    yMod = Math.abs(lowestY);
  }
  if (lowestX < 0) {
    xMod = Math.abs(lowestX);
  }

  const newLinks = links.map(link => [link[0] + xMod, link[1] + yMod]);

  let frameLine = '..................';
  const frame: string[][] = [];
  for (let i = 0; i < 6; i++) {
    frame.push(frameLine.split(''));
  }

  newLinks.forEach((link, index) => {
    frame[link[1]][link[0]] = String(index);
  });

  console.log(frame.map(line => line.join('')));
}

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
  if (sTail[1] !== tail[1] && sTail[0] !== tail[0]) {
    // no realignment needed
  } else if (sTail[1] !== tail[1]) {
    // tail moved on y
    const tailOffsetX = head[0] - tail[0];
    if (tailOffsetX >= 1) {
      tail[0]++;
    } else if (tailOffsetX <= -1) {
      tail[0]--;
    }
  } else if (sTail[0] !== tail[0]) {
    // tail moved on x
    const tailOffsetY = head[1] - tail[1];
    if (tailOffsetY >= 1) {
      tail[1]++;
    } else if (tailOffsetY <= -1) {
      tail[1]--;
    }
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
    //renderLinksFrame(links);
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
    const uniquePositions = [...new Set(allPositions)];
    return uniquePositions.length;
  }
}
