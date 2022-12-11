import dayTest from "../../dayTest";
import Day11Part1 from "../Day11Part1";

const dataSets = [
  {
    inputPath: './day11/tests/day11TestInput1.txt',
    expectedResult: 10605,
  },
  {
    inputPath: './day11/tests/day11TestInput2.txt',
    expectedResult: 55930,
  },
]

dayTest(new Day11Part1(), dataSets);

