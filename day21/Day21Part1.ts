import Day from "../Day";

const op = {
  '+': (a: number, b: number) => a + b,
  '-': (a: number, b: number) => a - b,
  '/': (a: number, b: number) => a / b,
  '*': (a: number, b: number) => a * b,
}

export default class Day21Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/)
      .map(item => item.replace(':', '').split(' '));
    const monkeyMap = new Map();
    input.forEach(line => {
      monkeyMap.set(line[0], line.slice(1));
    });

    function monkeyYell(name: string): number {
      const monkey = monkeyMap.get(name);
      if (monkey.length === 1) {
        return Number(monkey[0]);
      }

      // @ts-ignore
      return op[monkey[1]](monkeyYell(monkey[0]), monkeyYell(monkey[2]));
    }

    return monkeyYell('root');
  }
}
