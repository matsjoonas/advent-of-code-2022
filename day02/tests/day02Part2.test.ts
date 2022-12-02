import dayTest from "../../dayTest";
import Day02Part2 from "../Day02Part2";

const dataSets = [
  {
    inputPath: './day02/tests/day02TestInput1.txt',
    expectedResult: 12,
  },
  {
    inputPath: './day02/tests/day02TestInput2.txt',
    expectedResult: 11696,
  },
]

dayTest(new Day02Part2(), dataSets);

