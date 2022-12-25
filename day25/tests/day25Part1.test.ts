import dayTest from "../../dayTest";
import Day25Part1 from "../Day25Part1";

const dataSets = [
  {
    inputPath: './day25/tests/day25TestInput1.txt',
    expectedResult: '2=-1=0',
  },
]

dayTest(new Day25Part1(), dataSets);

