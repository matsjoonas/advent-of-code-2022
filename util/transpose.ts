export default function transpose(arr: any[][]): any[][] {
  const newArray: any[][] = [];
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      if (!newArray[x]) {
        newArray[x] = [];
      }
      newArray[x][y] = arr[y][x];
    }
  }

  return newArray;
}
