import Day01Part1 from "../Day01Part1";
import fs from "fs";

const dataSets = [
  {
    inputPath: './day01/tests/day01TestInput1.txt',
    expectedResult: 'asdf',
  },
]

describe.each(dataSets)('Day01Part1 should return:', (dataSet) => {
  it(`${dataSet.expectedResult} - for input path: ${dataSet.inputPath}`, () => {
    const data = fs.readFileSync(dataSet.inputPath);
    const result = new Day01Part1().solve(data.toString());

    expect(result).toBe(dataSet.expectedResult);
  });
});
