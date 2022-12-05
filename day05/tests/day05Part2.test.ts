import dayTest from "../../dayTest";
import Day05Part2 from "../Day05Part2";

const dataSets = [
  {
    inputPath: './day05/tests/day05TestInput1.txt',
    expectedResult: 'MCD',
  },
  {
    inputPath: './day05/tests/day05TestInput2.txt',
    expectedResult: 'CQQBBJFCS',
  },
]

dayTest(new Day05Part2(), dataSets);

