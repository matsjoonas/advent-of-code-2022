import yargs from 'yargs/yargs';
import {hideBin} from "yargs/helpers";
import Day01Part1 from './Day01/Day01Part1';
import Day01Part2 from "./Day01/Day01Part2";
import AocSuite from "./AocSuite";

// should probs be a separate file for easier generation
const solvers = [
  [
    new Day01Part1(),
    new Day01Part2(),
  ]
]

const suite = new AocSuite(solvers);

const argv = yargs(hideBin(process.argv)).argv;
// @ts-ignore
const day: number = argv.day;
// @ts-ignore
const part: number = argv.part;
suite.solve(day, part, true);
