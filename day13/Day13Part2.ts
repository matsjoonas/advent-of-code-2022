import Day from "../Day";

function compare(left: any, right: any): boolean | undefined {
  // undefined result
  if (left === undefined && right === undefined) {
    return undefined;
  }

  // left ran out first
  if (left === undefined) {
    return true;
  }

  // right ran out first
  if (right === undefined) {
    return false;
  }

  if (typeof left === 'number' && typeof right === 'number') {
    if (right === left) {
      return undefined;
    }
    return right > left;
  }

  if (typeof right === 'number') {
    right = [right];
  }

  if (typeof left === 'number') {
    left = [left];
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length; i++) {
      const result = compare(left[i], right[i]);
      if (result !== undefined) {
        return result;
      }
    }
    if (left.length === right.length) {
      return undefined;
    }
  }

  //console.log('FINAL RETURN');
  return true;
}

export default class Day13Part2 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/);
    let lines: any[] = [];
    input.forEach(line => {
      if (line === '') {
        return;
      }
      lines.push(JSON.parse(line));
    });

    lines.push([[2]]);
    lines.push([[6]]);

    const sorted = lines.sort((a, b) => {
      const result = compare(a, b);
      if (result) {
        return -1;
      }
      return 1;
    }).map(arr => JSON.stringify(arr));

    return (sorted.indexOf('[[2]]') + 1) * (sorted.indexOf('[[6]]') + 1);
  }
}
