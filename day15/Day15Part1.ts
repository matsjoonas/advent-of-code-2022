import Day from "../Day";

export default class Day15Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/).map(line => {
      return line.replace('Sensor at x=', '')
        .replace(': closest beacon is at x=', '|')
        .replaceAll('y=', '')
        .split('|')
        .map(item => item.split(', ').map(Number));
    });
    console.log(input);

    // sort and calc the grid size
    // calc the tacicab dist to beacon, so, Sensor, beacon, taxicab
    // for each point -> for each sensor get the distance from point to sensor, if out of range of all, then count that
    return 0;
  }
}
