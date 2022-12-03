import dayTest from "../../dayTest";
import Day03Part1 from "../Day03Part1";

const dataSets = [
  {
    inputPath: './day03/tests/day03TestInput1.txt',
    expectedResult: 157,
  },
  {
    inputPath: './day03/tests/day03TestInput2.txt',
    expectedResult: 7917,
  },
]

dayTest(new Day03Part1(), dataSets);

