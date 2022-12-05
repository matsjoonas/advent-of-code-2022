import Day from "../Day";
import parseCrates from "./parseCrates";

export default class Day05Part2 implements Day {
  public solve(rawInput: string): string {
    const input = rawInput.split('\r\n\r\n');

    const crates: string[][] = parseCrates(input[0].split('\r\n'));

    const commands = input[1].trim().split('\r\n')
      .map(line => {
        const arr = line.split(/move | from | to /).map(Number);
        arr.shift();
        return arr;
      });

    commands.forEach(command => {
      const groupToMove = [];
      for (let i = 0; i < command[0]; i++) {
        const toMove = crates[command[1] - 1].shift() || '';
        groupToMove.push(toMove);
      }
      crates[command[2] - 1] = [...groupToMove, ...crates[command[2] - 1]];
    });

    return crates.reduce((acc, col) => acc + col[0], '');
  }
}
