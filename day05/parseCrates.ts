export default function parseCrates(rawStack: string[]): string[][] {
  const headerRow = (rawStack.slice(-1)[0] || '').split('');
  const crateLines = rawStack.slice(0, rawStack.length - 1).map(row => row.split(''));

  const flippedCrates: string[][] = [];
  for (let h = 0; h < headerRow.length; h++) {
    if (headerRow[h] === ' ') {
      continue;
    }
    const rowIndex = Number(headerRow[h]) - 1;
    crateLines.forEach(crateLine => {
      if (!flippedCrates[rowIndex]) {
        flippedCrates[rowIndex] = [];
      }
      flippedCrates[rowIndex].push(crateLine[h]);
    });
  }

  return flippedCrates.map(line => line.filter(item => item !== ' '));
}
