import Day from "../Day";

export default class Day05Part1 implements Day {
  public solve(rawInput: string): string {
    const input = rawInput.split('\r\n\r\n');

    const rawCrates = input[0].split('\r\n');
    rawCrates.pop();
    const crates: string[][] = [];
    for (let i = 0; i < rawCrates.length; i++) {
      const cratesArr = rawCrates[i]
        .split('] [').join('')
        .split(']').join('')
        .split('[').join('')
        .split('    ').join(' ')
        .split('');

      cratesArr.forEach((command, s) => {
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

    console.log(commands);

    commands.forEach(command => {
      for (let i = 0; i < command[0]; i++) {
        const toMove = crates[command[1] - 1].shift() || '';
        crates[command[2] - 1].unshift(toMove);
        if (toMove === ' ') {
          i--;
        }
      }
    });

    const finalCrates = crates.map(crateLine => crateLine.join(' ').trim());
    console.log(finalCrates);

    return finalCrates.reduce((acc, col) => acc + col[0], '');
  }
}
