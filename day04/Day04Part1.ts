import Day from "../Day";

export default class Day04Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim()
      .split(/\r\n|\n/)
      .map(line => {
        return line.split(',')
          .map(range => range.split('-').map(Number));
      });

    return input.reduce((acc, ranges) => {
      const [a, b] = ranges;
      if ((a[0] <= b[0] && a[1] >= b[1]) || (a[0] >= b[0] && a[1] <= b[1])) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }
}
