import {BlizPos} from "./BlizPos";

export default function render(blizPositions: BlizPos[], playerPositions: Set<string>, width: number, height: number) {
  const blizzardChars = '^>v<';
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
      if (blizzardChars.includes(currentTile)) {
        rows[thisPoint[0]][thisPoint[1]] = '2';
      } else {
        rows[thisPoint[0]][thisPoint[1]] = direction;
      }
    } else {
      rows[thisPoint[0]][thisPoint[1]] = (Number(currentTile) + 1).toString();
    }
  });

  playerPositions.forEach(playerPosString => {
    const playerPos = playerPosString.split(',').map(Number);
    if (blizzardChars.includes(rows[playerPos[0]][playerPos[1]])) {
      console.log(playerPosString);
      console.log(playerPos);
      throw new Error('Player can not be rendered on a blizzard tile');
    }
    rows[playerPos[0]][playerPos[1]] = '█';
  });

  return rows.map(row => row.join('')).join('\r\n');
}
