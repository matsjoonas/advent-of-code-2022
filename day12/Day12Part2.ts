import Day from "../Day";
import Graph from "node-dijkstra";

function getHeight(char: string) {
  const heights = '#abcdefghijklmnopqrstuvwxyz';
  if (char === 'S') {
    return 1;
  }
  if (char === 'E') {
    return heights.indexOf('z');
  }
  return heights.indexOf(char) ;
}

function getKey(coords: number[]) {
  return coords.join(',');
}

export default class Day12Part2 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim()
      .split(/\r\n|\n/)
      .map(line => line.split(''));

    // generate a map of nodes
    const nodes: any = {};
    const startingNodes = ['S'];
    for (let r = 0; r < input.length; r++) {
      for (let c = 0; c < input[r].length; c++) {
        let thisKey = getKey([r,c]);
        if (input[r][c] === 'E' || input[r][c] === 'S') {
          thisKey = input[r][c];
        }
        if (!nodes[thisKey]) {
          nodes[thisKey] = {};
        }

        const thisHeight = getHeight(input[r][c]);
        // get neighbours
        [[-1, 0], [0, 1], [1, 0], [0, -1]].forEach(direction => {
          const coords = [r + direction[0], c + direction[1]];
          if (!input[coords[0]] || !input[coords[0]][coords[1]]) {
            return;
          }
          const height = getHeight(input[coords[0]][coords[1]]);
          let neighbourKey = getKey(coords);
          if (height === 1) {
            startingNodes.push(neighbourKey);
          }
          if (input[coords[0]][coords[1]] === 'E' || input[coords[0]][coords[1]] === 'S') {
            neighbourKey = input[coords[0]][coords[1]];
          }
          if ((height - thisHeight) <= 1) {
            nodes[thisKey][neighbourKey] = height;
          }
        });
      }
    }

    const route = new Graph(nodes);

    // @ts-ignore
    const routeLengths = [];
    startingNodes.forEach(start => {
      const path = route.path(start, 'E');
      if (path) {
        // @ts-ignore
        routeLengths.push(path.length - 1);
      }
    });

    // @ts-ignore
    return routeLengths.sort((a, b) => a - b)[0];
  }
}
