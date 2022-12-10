import Day from "../Day";

/*
For now, consider the signal strength
(the cycle number multiplied by the value of the X register)
during the 20th cycle and every 40 cycles after that
(that is, during the 20th, 60th, 100th, 140th, 180th, and 220th cycles).
 */

function maybeSignalStrength(cycle: number, register: number, signalStrengths: number[]) {
  if (cycle === 20 || ((cycle + 20) % 40 === 0)) {
    signalStrengths.push(cycle * register);
  }
}

export default class Day10Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/);

    let cycle = 1;
    let registerX = 1;
    const signalStrengths: number[] = [];
    for (let i = 0; i < input.length; i++) {
      const instr = input[i].split(' ');
      if (instr[0] === 'noop') {
        maybeSignalStrength(cycle, registerX, signalStrengths);
        cycle ++;
      } else {
        maybeSignalStrength(cycle, registerX, signalStrengths);
        cycle++;
        maybeSignalStrength(cycle, registerX, signalStrengths);
        cycle++;
        registerX += Number(instr[1]);
      }
    }

    return signalStrengths.reduce((acc, cur) => acc + cur, 0);
  }
}
