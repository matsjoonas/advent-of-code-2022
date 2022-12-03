import Day from "../Day";

function priority(char: string) {
  const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return priorities.indexOf(char) + 1;
}

function commonItem(bag: string) {
  const middleIndex = bag.length / 2;
  const compartments = [bag.substring(0, middleIndex), bag.substring(middleIndex)];
  let commonChar = null;
  compartments[0].split('').every(char => {
    const idx = compartments[1].indexOf(char);
    if (idx !== -1) {
      commonChar = char;
      return false;
    }
    return true;
  });

  compartments[1].split('').every(char => {
    const idx = compartments[0].indexOf(char);
    if (idx !== -1) {
      commonChar = char;
      return false;
    }
    return true;
  });

  return commonChar || '';
}

export default class Day03Part2 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim()
      .split('\r\n');

    let prioritiesSum = 0;
    input.forEach(bag => {
      prioritiesSum += priority(commonItem(bag));
    });

    return prioritiesSum;
  }
}
