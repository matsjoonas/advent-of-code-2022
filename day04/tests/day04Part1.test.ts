import dayTest from "../../dayTest";
import Day04Part1 from "../Day04Part1";

const dataSets = [
  {
    inputPath: './day04/tests/day04TestInput1.txt',
    expectedResult: 2,
  },
  {
    inputPath: './day04/tests/day04TestInput2.txt',
    expectedResult: 433,
  },
]

dayTest(new Day04Part1(), dataSets);

