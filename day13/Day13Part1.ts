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

export default class Day13Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/);
    let pairs: any[] = [];
    let index = 0;
    input.forEach(line => {
      if (line === '') {
        index++;
        return;
      }
      if (!pairs[index]) {
        pairs[index] = [];
      }
      pairs[index].push(JSON.parse(line));
    });


    const allResults = pairs.map(pair => compare(pair[0], pair[1]));
    console.log(allResults);
    const finalResult = allResults.reduce((acc, result, index) => {
        if (result) {
          return acc + index + 1;
        }
        return acc;
      },0);

    return finalResult
  }
}
