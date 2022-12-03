import Day from "../Day";
import priority from "./priority";
import intersectionOfStrings from "./intersectionOfStrings";

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
      prioritiesSum += priority(group.reduce(intersectionOfStrings));
    });

    return prioritiesSum;
  }
}
