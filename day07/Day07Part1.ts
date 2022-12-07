import Day from "../Day";

export default class Day07Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/);

    const dirSizes = new Map();
    const path: string[] = [];

    input.forEach((line, curI) => {
      if (line === '$ ls') {
        console.log(path);
        let endI = input.slice(curI + 1).findIndex(value => {
          return value.includes('$');
        });

        let contents = [];
        if (endI === -1) {
          contents = input.slice(curI + 1);
        } else {
          contents = input.slice(curI + 1, curI + endI + 1);
        }

        console.log(contents);

        let currentDirSize = 0;
        contents.forEach(line => {
          if (!line.includes('dir')) {
            currentDirSize += +line.split((' '))[0];
          }
        });

        // add to dirsizes here
        path.forEach(dirName => {
          if (!dirSizes.get(dirName)) {
            dirSizes.set(dirName, 0);
          }
          dirSizes.set(dirName, dirSizes.get(dirName) + currentDirSize);
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
