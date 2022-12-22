import rotateClockwise from "../rotateClockwise";

const dataSets = [
  {
    set: 0,
    arrayIn: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    arrayOut: [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ],
  },
  {
    set: 1,
    arrayIn: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12],
    ],
    arrayOut: [
      [10, 7, 4, 1],
      [11, 8, 5, 2],
      [12, 9, 6, 3],
    ],
  },
  {
    set: 2,
    arrayIn: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ],
    arrayOut: [
      [9, 5, 1],
      [10, 6, 2],
      [11, 7, 3],
      [12, 8, 4],
    ],
  },
]

describe.each(dataSets)(`rotateClockwise should work for:`, (dataSet) => {
  it(`dataset ${dataSet.set}`, () => {
    expect(rotateClockwise(dataSet.arrayIn)).toEqual(dataSet.arrayOut);
  });
});
