import Day from "../Day";

export default class Day06Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split('');

    for (let i = 0; i < input.length - 4; i++) {
      const sequence = input.slice(i, i + 4);
      const uniquesOnly = [...new Set(sequence)];
      if (sequence.length === uniquesOnly.length) {
        return i + 4;
      }
    }

    return 0;
  }
}
