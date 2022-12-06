import dayTest from "../../dayTest";
import Day06Part2 from "../Day06Part2";

const dataSets = [
  {
    inputPath: './day06/tests/day06TestInput1.txt',
    expectedResult: 19,
  },
  {
    inputPath: './day06/tests/day06TestInput2.txt',
    expectedResult: 23,
  },
  {
    inputPath: './day06/tests/day06TestInput3.txt',
    expectedResult: 23,
  },
  {
    inputPath: './day06/tests/day06TestInput4.txt',
    expectedResult: 29,
  },
  {
    inputPath: './day06/tests/day06TestInput5.txt',
    expectedResult: 26,
  },
  {
    inputPath: './day06/tests/day06TestInput6.txt',
    expectedResult: 3037,
  },
]

dayTest(new Day06Part2(), dataSets);

