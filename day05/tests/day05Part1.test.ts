import dayTest from "../../dayTest";
import Day05Part1 from "../Day05Part1";

const dataSets = [
  {
    inputPath: './day05/tests/day05TestInput1.txt',
    expectedResult: 'CMZ',
  },
  {
    inputPath: './day05/tests/day05TestInput2.txt',
    expectedResult: 'RFFFWBPNS',
  },
]

dayTest(new Day05Part1(), dataSets);

