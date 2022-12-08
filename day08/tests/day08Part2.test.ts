import dayTest from "../../dayTest";
import Day08Part2 from "../Day08Part2";

const dataSets = [
  {
    inputPath: './day08/tests/day08TestInput1.txt',
    expectedResult: 8,
  },
  {
    inputPath: './day08/tests/day08TestInput2.txt',
    expectedResult: 315495,
  },
]

dayTest(new Day08Part2(), dataSets);

