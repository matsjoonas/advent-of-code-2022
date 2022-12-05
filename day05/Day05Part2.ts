import Day from "../Day";

export default class Day05Part2 implements Day {
  public solve(rawInput: string): string {
    const input = rawInput.split('\r\n\r\n');

    const rawCrates = input[0].split('\r\n');
    const header = rawCrates.pop() || '';
    const headerArr = header.split('');
    const indices: number[] = [];
    headerArr.forEach((col, i) => {
      if (col !== ' ') {
        indices.push(Number(i));
      }
    });


    const crates: string[][] = [];
    const parsedCrates: string[][] = [];
    for (let i = 0; i < rawCrates.length; i++) {
      const cratesArr = rawCrates[i].split('');

      if (!parsedCrates[i]) {
        parsedCrates[i] = [];
      }
      indices.forEach(idx => {
        parsedCrates[i].push(cratesArr[idx] || ' ');
      });

      parsedCrates[i].forEach((command, s) => {
        if (!crates[s]) {
          crates[s] = [];
        }
        crates[s][i] = command;
      });
    }

    const finalParsedCrates = crates.map(line => line.filter(item => item !== ' '));

    const commands = input[1].trim().split('\r\n')
      .map(line => {
        const arr = line.split(/move | from | to /).map(Number);
        arr.shift();
        return arr;
      });

    commands.forEach(command => {
      const groupToMove = [];
      for (let i = 0; i < command[0]; i++) {
        const toMove = finalParsedCrates[command[1] - 1].shift() || '';
        groupToMove.push(toMove);
      }
      finalParsedCrates[command[2] - 1] = [...groupToMove, ...finalParsedCrates[command[2] - 1]];
    });

    return finalParsedCrates.reduce((acc, col) => acc + col[0], '');
  }
}
