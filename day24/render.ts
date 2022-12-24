import {BlizPos} from "./BlizPos";

export default function render(blizPositions: BlizPos[], playerPos: number[], width: number, height: number) {
  let rows: string[][] = [];
  for (let y = 0; y < height; y++) {
    if (!rows[y]) {
      rows[y] = [];
    }
    for (let x = 0; x < width; x++) {
      let char = '.';
      if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
        char = '#';
      }
      rows[y][x] = char;
    }
  }

  blizPositions.forEach(blizPos => {
    const [thisPoint, direction] = blizPos;
    let currentTile = rows[thisPoint[0]][thisPoint[1]];
    if (isNaN(Number(currentTile))) {
      if ('^>v<'.includes(currentTile)) {
        rows[thisPoint[0]][thisPoint[1]] = '2';
      } else {
        rows[thisPoint[0]][thisPoint[1]] = direction;
      }
    } else {
      rows[thisPoint[0]][thisPoint[1]] = (Number(currentTile) + 1).toString();
    }
  });

  return rows.map(row => row.join('')).join('\r\n');
}
