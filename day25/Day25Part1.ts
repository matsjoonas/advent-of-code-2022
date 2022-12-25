import Day from "../Day";

function snafuToBase10(snafuString: string) {
  const snafuArr = snafuString.split('').map(item => {
    return Number(item.replace('-', '-1').replace('=', '-2'));
  });
  snafuArr.reverse();
  let base10 = 0;
  snafuArr.forEach((snafu, index) => {
    base10 += Math.pow(5, index) * snafu;
  });

  return base10;
}

function base10ToSnafu(base10: number) {
  console.log(base10.toString(5));
  return parseInt(base10.toString(), 5);
}

export default class Day25Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/);

    const result = input.reduce((acc, cur) => acc + snafuToBase10(cur), 0);

    return base10ToSnafu(result);
  }
}
