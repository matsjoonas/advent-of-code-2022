import dayTest from "../../dayTest";
import Day01Part1 from "../Day01Part1";

const dataSets = [
  {
    inputPath: './day01/tests/day01TestInput1.txt',
    expectedResult: 'asdf',
  },
]

dayTest(new Day01Part1(), dataSets);

