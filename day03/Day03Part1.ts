import Day from "../Day";
import priority from "./priority";
import intersectionOfStrings from "./intersectionOfStrings";

function commonItem(bag: string) {
  const middleIndex = bag.length / 2;
  return intersectionOfStrings(bag.substring(0, middleIndex), bag.substring(middleIndex));
}

export default class Day03Part1 implements Day {
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
