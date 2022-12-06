import transpose from "../transpose";

const dataSets = [
  {
    set: 0,
    arrayIn: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    arrayOut: [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
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
      [1, 4, 7, 10],
      [2, 5, 8, 11],
      [3, 6, 9, 12],
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
      [1, 5, 9],
      [2, 6, 10],
      [3, 7, 11],
      [4, 8, 12],
    ],
  },
]

describe.each(dataSets)(`transpose should work for:`, (dataSet) => {
  it(`dataset ${dataSet.set}`, () => {
    expect(transpose(dataSet.arrayIn)).toEqual(dataSet.arrayOut);
  });
});
