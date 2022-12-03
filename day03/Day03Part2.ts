import Day from "../Day";

function priority(char: string) {
  const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return priorities.indexOf(char) + 1;
}

function getCommonItems(a: string, b: string) {
  let commonChars = '';
  a.split('').every(char => {
    const idx = b.indexOf(char);
    if (idx !== -1) {
      commonChars += char;
    }
    return true;
  });

  b.split('').every(char => {
    const idx = a.indexOf(char);
    if (idx !== -1) {
      commonChars += char;
      return false;
    }
    return true;
  });

  return [...new Set(commonChars.split(''))].join();
}

function commonBetweenArrays(group: string[]) {
  let commonItems = '';
  group.forEach(line => {
    if (!commonItems) {
      commonItems = line;
    }
    commonItems = getCommonItems(line, commonItems);
  });

  return commonItems;
}

export default class Day03Part2 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim()
      .split('\r\n');

    const groups: string[][] = [];
    let groupIndex = 0;
    input.forEach((line, index) => {
      const limit = (index + 1) % 3;

      if (!groups[groupIndex]) {
        groups[groupIndex] = [];
      }
      groups[groupIndex].push(line);

      if (limit === 0) {
        groupIndex++;
      }
    });

    let prioritiesSum = 0;
    groups.forEach(group => {
      prioritiesSum += priority(commonBetweenArrays(group));
    });

    return prioritiesSum;
  }
}
