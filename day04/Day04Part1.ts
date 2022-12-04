import Day from "../Day";

export default class Day04Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim()
      .split('\r\n')
      .map(line => {
        return line.split(',')
          .map(range => range.split('-').map(Number));
      });

    return input.reduce((acc, line) => {
      let long = line[0];
      let short = line[1];
      if ((long[1] - long[0]) < (short[1] - short[0])) {
        long = line[1];
        short = line[0];
      }

      if (long[0] <= short[0] && long[1] >= short[1]) {
        return acc + 1;
      }

      return acc;
    }, 0)
  }
}
