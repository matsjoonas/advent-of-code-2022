import Day from "../Day";

export default class Day20Part2 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/)
      .map(Number);

    const original = input.map((value, index) => [value * 811589153, index]);
    const workingArray = [...original];

    for (let i = 0; i < 10; i++) {
      original.forEach(item => {
        const currentIndex = workingArray.findIndex(workingItem => workingItem[0] === item[0] && workingItem[1] === item[1]);
        let newIndex = currentIndex + workingArray[currentIndex][0];
        newIndex = newIndex % (workingArray.length - 1);
        const toMove = workingArray.splice(currentIndex, 1);
        workingArray.splice(newIndex, 0, toMove[0]);
      });
    }

    const i0 = workingArray.findIndex(workingItem => workingItem[0] === 0);
    const iA = (i0 + 1000) % workingArray.length;
    const iB = (i0 + 2000) % workingArray.length;
    const iC = (i0 + 3000) % workingArray.length;

    return workingArray[iA][0] + workingArray[iB][0] + workingArray[iC][0];
  }
}
