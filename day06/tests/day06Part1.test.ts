import dayTest from "../../dayTest";
import Day06Part1 from "../Day06Part1";

const dataSets = [
  {
    inputPath: './day06/tests/day06TestInput1.txt',
    expectedResult: 7,
  },
  {
    inputPath: './day06/tests/day06TestInput2.txt',
    expectedResult: 5,
  },
  {
    inputPath: './day06/tests/day06TestInput3.txt',
    expectedResult: 6,
  },
  {
    inputPath: './day06/tests/day06TestInput4.txt',
    expectedResult: 10,
  },
  {
    inputPath: './day06/tests/day06TestInput5.txt',
    expectedResult: 11,
  },
  {
    inputPath: './day06/tests/day06TestInput6.txt',
    expectedResult: 1238,
  },
]

dayTest(new Day06Part1(), dataSets);

