import Day from "../Day";

interface Monkey {
  items: number[];
  op: Function;
  testDivBy: number;
  trueTo: number,
  falseTo: number,
  inspectionCount: number,
}

function getOp(instruction: string[]) {
  let fun = (a: number, b: number) => a + b;
  if (instruction[1] === '*') {
    fun = (a: number, b: number) => a * b;
  }

  if (instruction[2] === 'old') {
    return (old: number) => fun(old, old);
  }

  return (old: number) => fun(old, Number(instruction[2]));
}

export default class Day11Part2 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/);

    const monkies: Monkey[] = [];
    input.forEach((line, index) => {
      if (line.includes('Monkey')) {
        const content = input.slice(index + 1, index + 6).map(line => line.trim());
        const monkey: Monkey = {
          items: content[0].replace('Starting items: ', '').split(', ').map(Number),
          op: getOp(content[1].replace('Operation: new = ', '').split(' ')),
          testDivBy: Number(content[2].replace('Test: divisible by ', '')),
          trueTo: Number(content[3].replace('If true: throw to monkey ', '')),
          falseTo: Number(content[4].replace('If false: throw to monkey ', '')),
          inspectionCount: 0,
        };
        monkies.push(monkey);
      }
    });

    for (let round = 0; round < 10000; round++) {
      monkies.forEach(thisMonkey => {
        thisMonkey.items.forEach(item => {
          thisMonkey.inspectionCount += 1;
          const moddedItem = Math.floor(thisMonkey.op(item));
          if (moddedItem % thisMonkey.testDivBy === 0) {
            monkies[thisMonkey.trueTo].items.push(moddedItem);
          } else {
            monkies[thisMonkey.falseTo].items.push(moddedItem);
          }
        });
        // set items to empty when monkey has supposedly thrown them all
        thisMonkey.items = [];
      });
    }

    const result = monkies
      .sort((a, b) => b.inspectionCount - a.inspectionCount)
      .slice(0, 2);

    return result.reduce((acc, cur) => acc * cur.inspectionCount, 1);
  }
}
