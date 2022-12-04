import dayTest from "../../dayTest";
import Day04Part2 from "../Day04Part2";

const dataSets = [
  {
    inputPath: './day04/tests/day04TestInput1.txt',
    expectedResult: 4,
  },
  {
    inputPath: './day04/tests/day04TestInput2.txt',
    expectedResult: 852,
  },
]

dayTest(new Day04Part2(), dataSets);

