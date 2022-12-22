export default function rotateClockwise(arr: any[][], steps = 1): any[][] {
  let finalArray: any[][] = arr;
  for (let step = 0; step < steps; step++) {
    const newArray: any[][] = [];
    for (let y = 0; y < finalArray.length; y++) {
      for (let x = 0; x < finalArray[y].length; x++) {
        const newY = x;
        const newX = finalArray.length - 1 - y;
        if (newArray[newY] === undefined) {
          newArray[newY] = [];
        }

        newArray[newY][newX] = finalArray[y][x];
      }
    }

    finalArray = [...newArray];
  }

  return finalArray;
}
