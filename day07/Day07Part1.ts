import Day from "../Day";

export default class Day07Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/);

    const dirSizes = new Map();
    const path: string[] = [];

    input.forEach((line, curI) => {
      if (line === '$ ls') {
        let endI = input.slice(curI + 1).findIndex(value => value.includes('$'));

        let contents = [];
        if (endI === -1) {
          contents = input.slice(curI + 1);
        } else {
          contents = input.slice(curI + 1, curI + endI + 1);
        }

        let currentDirSize = 0;
        contents.forEach(line => {
          if (!line.includes('dir')) {
            currentDirSize += +line.split((' '))[0];
          }
        });

        // add to dirsizes here
        path.forEach((dirName, idx) => {
          const key = path.slice(0, idx + 1).join('');
          if (!dirSizes.get(key)) {
            dirSizes.set(key, 0);
          }
          dirSizes.set(key, dirSizes.get(key) + currentDirSize);
        });
      }

      if (line.includes('$ cd')) {
        const dir = line.substring(5);
        if (dir === '..') {
          path.pop();
        } else {
          path.push(dir);
        }
      }
    });

    return [...dirSizes].reduce((acc, [k, v]) => {
      if (v <= 100000) {
        acc += v;
      }
      return acc;
    }, 0);
  }
}
