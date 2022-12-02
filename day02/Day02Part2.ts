import Day from "../Day";

const myWin = [2, 3, 1];
const theirWin = [3, 1, 2];

export default class Day02Part2 implements Day {
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
      let me = pair[1];
      const opponent = pair[0];

      if (me === 1) {
        // lose
        me = theirWin[opponent - 1];
      } else if (me === 2) {
        me = opponent;
      } else {
        me = myWin[opponent - 1];
      }

      result += me;
      if (opponent === me) {
        result += 3;
      } else if (me === myWin[opponent - 1]) {
        result += 6;
      }
    });

    return result;
  }
}
