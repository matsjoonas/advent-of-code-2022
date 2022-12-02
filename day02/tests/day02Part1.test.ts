import dayTest from "../../dayTest";
import Day02Part1 from "../Day02Part1";

const dataSets = [
  {
    inputPath: './day02/tests/day02TestInput1.txt',
    expectedResult: 15,
  },
  {
    inputPath: './day02/tests/day02TestInput2.txt',
    expectedResult: 15337,
  },
]

dayTest(new Day02Part1(), dataSets);

