import dayTest from "../../dayTest";
import Day01Part2 from "../Day01Part2";

const dataSets = [
  {
    inputPath: './day01/tests/day01TestInput1.txt',
    expectedResult: 45000,
  },
  {
    inputPath: './day01/tests/day01TestInput2.txt',
    expectedResult: 213089,
  },
]

dayTest(new Day01Part2(), dataSets);

