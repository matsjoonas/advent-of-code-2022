import dayTest from "../../dayTest";
import Day08Part1 from "../Day08Part1";

const dataSets = [
  {
    inputPath: './day08/tests/day08TestInput1.txt',
    expectedResult: 21,
  },
  {
    inputPath: './day08/tests/day08TestInput2.txt',
    expectedResult: 1812,
  },
]

dayTest(new Day08Part1(), dataSets);

