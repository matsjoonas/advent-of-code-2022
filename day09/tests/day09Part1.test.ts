import dayTest from "../../dayTest";
import Day09Part1 from "../Day09Part1";

const dataSets = [
  {
    inputPath: './day09/tests/day09TestInput1.txt',
    expectedResult: 13,
  },
  {
    inputPath: './day09/tests/day09TestInput2.txt',
    expectedResult: 6243,
  },
]

dayTest(new Day09Part1(), dataSets);

