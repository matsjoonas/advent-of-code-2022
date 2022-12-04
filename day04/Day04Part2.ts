import Day from "../Day";

export default class Day04Part2 implements Day {
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

      let early = line[0];
      let late = line[1];
      if (early[0] > late[0]) {
        late = line[0];
        early = line[1];
      }
      const startDiff = late[0] - early[0];
      if (startDiff >= 0 && startDiff <= early[1] - early[0]) {
        return acc + 1;
      }

      return acc;
    }, 0)
  }
}
