import dayTest from "../../dayTest";
import Day23Part1 from "../Day23Part1";

const dataSets = [
  {
    inputPath: './day23/tests/day23TestInput1.txt',
    expectedResult: 25,
  },
  {
    inputPath: './day23/tests/day23TestInput2.txt',
    expectedResult: 110,
  },
]

dayTest(new Day23Part1(), dataSets);

