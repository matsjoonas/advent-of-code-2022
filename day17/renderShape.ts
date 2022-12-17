export default function renderShape(shape: number[][]) {
  const sortedShape = shape.sort((a, b) => b[1] - a[1]);
  const highestY = sortedShape[0][1] + 1;
  const grid: string[][] = [];
  for (let row = 0; row < highestY; row++) {
    grid.push(['.', '.', '.', '.', '.', '.', '.']);
  }
  sortedShape.forEach(point => {
    const realY = grid.length - 1 - point[1];
    grid[realY][point[0]] = '#';
  });

  console.log(grid.map(row => row.join('')).join('\r\n'));
}
