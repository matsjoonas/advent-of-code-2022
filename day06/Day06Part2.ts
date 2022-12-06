import Day from "../Day";

export default class Day06Part2 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split('');

    for (let i = 0; i < input.length - 14; i++) {
      const sequence = input.slice(i, i + 14);
      const uniquesOnly = [...new Set(sequence)];
      if (sequence.length === uniquesOnly.length) {
        return i + 14;
      }
    }

    return 0;
  }
}
