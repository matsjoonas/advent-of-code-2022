import dayTest from "../../dayTest";
import Day07Part1 from "../Day07Part1";

const dataSets = [
  {
    inputPath: './day07/tests/day07TestInput1.txt',
    expectedResult: 95437,
  },
  {
    inputPath: './day07/tests/day07TestInput2.txt',
    expectedResult: 1427048,
  },
]

dayTest(new Day07Part1(), dataSets);

