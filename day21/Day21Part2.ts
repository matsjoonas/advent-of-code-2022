import Day from "../Day";

const op = {
  '+': (a: number, b: number) => a + b,
  '-': (a: number, b: number) => a - b,
  '/': (a: number, b: number) => a / b,
  '*': (a: number, b: number) => a * b,
}

const reverseOp = {
  '+': (a: number, b: number) => a - b,
  '-': (a: number, b: number) => a + b,
  '/': (a: number, b: number) => a * b,
  '*': (a: number, b: number) => a / b,
}

export default class Day21Part2 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/)
      .map(item => item.replace(':', '').split(' '));
    const monkeyMap = new Map();
    input.forEach(line => {
      monkeyMap.set(line[0], line.slice(1));
    });

    function monkeyYell(name: string, shouldLog = false): number {
      const monkey = monkeyMap.get(name);

      if (monkey.length === 1) {
        return Number(monkey[0]);
      }

      // @ts-ignore
      const result = op[monkey[1]](monkeyYell(monkey[0], shouldLog), monkeyYell(monkey[2], shouldLog));
      if (shouldLog) {
        console.log('MONKEY YELL ---')
        console.log(monkey);
        console.log(result);
      }
      return result;
    }

    function findValue(name: string, needle: number): number {
      if (name === 'humn') {
        console.log('HUMAN: ', needle);
        return needle;
      }

      const monkey = monkeyMap.get(name);

      if (monkey.length === 1) {
        console.log('Return just number: ', monkey[0]);
        return Number(monkey[0]);
      }

      console.log('---------');
      console.log(monkey);
      let humanSide = monkey[2];
      let targetValue = needle;
      let otherValue = 0;
      if (hasHuman(monkey[0])) {
        humanSide = monkey[0];
        otherValue = monkeyYell(monkey[2]);
      } else {
        otherValue = monkeyYell(monkey[0]);
      }
      // @ts-ignore
      const newNeedle = reverseOp[monkey[1]](targetValue, otherValue);
      console.log(targetValue, monkey[1], otherValue);
      console.log(newNeedle);
      return findValue(humanSide, newNeedle);
    }

    function hasHuman(name: string): boolean {
      const monkey = monkeyMap.get(name);
      if (monkey.length === 1) {
        return name === 'humn';
      }
      return hasHuman(monkey[0]) || hasHuman(monkey[2]);
    }


    // check which side has humn
    let humnSide = monkeyMap.get('root')[0];
    let otherSide = monkeyMap.get('root')[2];
    if (hasHuman(monkeyMap.get('root')[2])) {
      humnSide = monkeyMap.get('root')[2];
      otherSide = monkeyMap.get('root')[0];
    }

    // find the final value we need
    let target = monkeyYell(otherSide);
    // take target
    // go down the tree

    const foundValue = findValue(humnSide, target);
    return foundValue;
  }
}
