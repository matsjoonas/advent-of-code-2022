import Day from "../Day";
import parseCrates from "./parseCrates";

export default class Day05Part1 implements Day {
  public solve(rawInput: string): string {
    const input = rawInput.split(/\r\n\r\n|\n\n/);

    const crates: string[][] = parseCrates(input[0].split(/\r\n|\n/));

    const commands = input[1].trim().split(/\r\n|\n/)
      .map(line => {
        const arr = line.split(/move | from | to /).map(Number);
        arr.shift();
        return arr;
      });

    commands.forEach(command => {
      for (let i = 0; i < command[0]; i++) {
        const toMove = crates[command[1] - 1].shift() || '';
        crates[command[2] - 1].unshift(toMove);
      }
    });

    const finalCrates = crates.map(crateLine => crateLine.join(' '));
    return finalCrates.reduce((acc, col) => acc + col[0], '');
  }
}
