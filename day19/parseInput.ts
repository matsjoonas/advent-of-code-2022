export default function parseInput (rawInput: string) {
  const input = rawInput.trim().split(/\r\n|\n/)
    .join(',')
    .split(':')
    .join(',')
    .split('.')
    .join(',')
    .split(',');
  const parsed: number[][][] = [];
  let row = -1;
  input.forEach(line => {
    if (line.includes('Blueprint')) {
      row++;
    }
    if (!parsed[row]) {
      parsed[row] = [];
    }
    if (line.includes('Each')) {
      const splitLine = line.trim().split(' ');
      const costs = [0, 0, 0];
      const ore = splitLine[4];
      costs[0] = Number(ore);
      const clayOrObsidian = splitLine[7] || 0;
      if (splitLine[8] === 'clay') {
        costs[1] = Number(clayOrObsidian);
      } else {
        costs[2] = Number(clayOrObsidian);
      }

      parsed[row].push(costs);
    }
  });

  return parsed;
}
