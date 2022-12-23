export default function frame(points: number[][], marker = '#', emptyTile = '.') {
  let lowX: number = 9999999999999999999;
  let highX: number = -9999999999999999999;
  let lowY: number = 9999999999999999999;
  let highY: number = -9999999999999999999;
  points.forEach(point => {
    const y = point[0];
    const x = point[1];
    if (y > highY) {
      highY = y;
    }
    if (y < lowY) {
      lowY = y;
    }
    if (x > highX) {
      highX = x;
    }
    if (x < lowX) {
      lowX = x;
    }
  });


  const offsetX = 0 - lowX;
  const offsetY = 0 - lowY;
  if (offsetX !== 0) {
    highX = highX + offsetX;
  }
  if (offsetY !== 0) {
    highY = highY + offsetY;
  }

  const translatedPoints = points.map(point => [point[0] + offsetY, point[1] + offsetX]);

  let frame: string[][] = [];
  for (let y = 0; y <= highY; y++) {
    if (!frame[y]) {
      frame[y] = [];
    }
    for (let x = 0; x <= highX; x++) {
      frame[y][x] = emptyTile;
    }
  }

  translatedPoints.forEach(point => {
    frame[point[0]][point[1]] = marker;
  });

  return frame;
}
