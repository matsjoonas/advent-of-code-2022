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
  const base5Arr = [...base10.toString(5).split('')];

  for (let i = base5Arr.length - 1; i >= 0; i--) {
    if (base5Arr[i] === '3') {
      base5Arr[i] = '=';
      base5Arr[i - 1] = (Number(base5Arr[i - 1]) + 1).toString();
    } else if (base5Arr[i] === '4') {
      base5Arr[i] = '-';
      base5Arr[i - 1] = (Number(base5Arr[i - 1]) + 1).toString();
    }
  }
  return base5Arr.join('');
}

export default class Day25Part1 implements Day {
  public solve(rawInput: string): string {
    const input = rawInput.trim().split(/\r\n|\n/);

    const result = input.reduce((acc, cur) => acc + snafuToBase10(cur), 0);

    return base10ToSnafu(result);
  }
}
