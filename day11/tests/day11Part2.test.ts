import dayTest from "../../dayTest";
import Day11Part2 from "../Day11Part2";

const dataSets = [
  {
    inputPath: './day11/tests/day11TestInput1.txt',
    expectedResult: 2713310158,
  },
  {
    inputPath: './day11/tests/day11TestInput2.txt',
    expectedResult: 14636993466,
  },
]

dayTest(new Day11Part2(), dataSets);

