import dayTest from "../../dayTest";
import Day09Part2 from "../Day09Part2";

const dataSets = [
  {
    inputPath: './day09/tests/day09TestInput1.txt',
    expectedResult: 1,
  },
  {
    inputPath: './day09/tests/day09TestInput3.txt',
    expectedResult: 36,
  },
]

dayTest(new Day09Part2(), dataSets);

