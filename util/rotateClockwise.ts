export default function rotateClockwise(arr: any[][]): any[][] {
  const newArray: any[][] = [];
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      const newY = x;
      const newX = arr.length - 1 - y;
      if (newArray[newY] === undefined) {
        newArray[newY] = [];
      }

      newArray[newY][newX] = arr[y][x];
    }
  }

  return newArray;
}
