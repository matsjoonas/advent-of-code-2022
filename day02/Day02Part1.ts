import Day from "../Day";

export default class Day02Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim()
      .split('\r\n')
      .map(item => {
        return item.split(' ')
          .map(value => {
            if (value === 'A' || value === 'X') {
              return 1;
            }
            if (value === 'B' || value === 'Y') {
              return 2;
            }
            if (value === 'C' || value === 'Z') {
              return 3;
            }
            return 0;
          });
      });

    let result = 0;
    input.forEach(pair => {
      const me = pair[1];
      const opponent = pair[0];
      result += me;
      if (opponent === me) {
        result += 3;
      } else if ((me === 1 && opponent === 3) || (me === 2 && opponent === 1) || (me === 3 && opponent === 2)) {
        result += 6;
      }
    });

    return result;
  }
}
