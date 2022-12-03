import dayTest from "../../dayTest";
import Day03Part2 from "../Day03Part2";

const dataSets = [
  {
    inputPath: './day03/tests/day03TestInput1.txt',
    expectedResult: 70,
  },
  {
    inputPath: './day03/tests/day03TestInput2.txt',
    expectedResult: 2585,
  },
]

dayTest(new Day03Part2(), dataSets);

