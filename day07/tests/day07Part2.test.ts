import dayTest from "../../dayTest";
import Day07Part2 from "../Day07Part2";

const dataSets = [
  {
    inputPath: './day07/tests/day07TestInput1.txt',
    expectedResult: 24933642,
  },
  {
    inputPath: './day07/tests/day07TestInput2.txt',
    expectedResult: 2940614,
  },
]

dayTest(new Day07Part2(), dataSets);

