import Day from "../Day";

export default class Day05Part1 implements Day {
  public solve(rawInput: string): string {
    const input = rawInput.split('\r\n\r\n');
    const rawCrates = input[0].split('\r\n');
    const header = rawCrates.pop() || '';
    const headerArr = header.split('');
    const colIndices: number[] = [];
    headerArr.forEach((col, i) => {
      if (col !== ' ') {
        colIndices.push(Number(i));
      }
    });

    const crates: string[][] = [];
    const parsedCrates: string[][] = [];
    for (let i = 0; i < rawCrates.length; i++) {
      const cratesArr = rawCrates[i].split('');

      if (!parsedCrates[i]) {
        parsedCrates[i] = [];
      }
      colIndices.forEach(idx => {
        parsedCrates[i].push(cratesArr[idx] || ' ');
      });

      parsedCrates[i].forEach((command, s) => {
        if (!crates[s]) {
          crates[s] = [];
        }
        crates[s][i] = command;
      });
    }

    const commands = input[1].trim().split('\r\n')
      .map(line => {
        const arr = line.split(/move | from | to /).map(Number);
        arr.shift();
        return arr;
      });

    commands.forEach(command => {
      for (let i = 0; i < command[0]; i++) {
        const toMove = crates[command[1] - 1].shift() || '';
        crates[command[2] - 1].unshift(toMove);
        if (toMove === ' ') {
          i--;
        }
      }
    });

    const finalCrates = crates.map(crateLine => crateLine.join(' '));
    return finalCrates.reduce((acc, col) => acc + col[0], '');
  }
}
