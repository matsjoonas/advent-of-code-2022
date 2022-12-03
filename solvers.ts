import Day from "./Day";
import Day01Part1 from "./day01/Day01Part1";
import Day01Part2 from "./day01/Day01Part2";
import Day02Part1 from "./day02/Day02Part1";
import Day02Part2 from "./day02/Day02Part2";
import Day03Part1 from "./day03/Day03Part1";
import Day03Part2 from "./day03/Day03Part2";
import Day04Part1 from "./day04/Day04Part1";
import Day04Part2 from "./day04/Day04Part2";

const solvers: Day[][] = [
  [
    new Day01Part1(),
    new Day01Part2(),
  ],
  [
    new Day02Part1(),
    new Day02Part2(),
  ],
  [
    new Day03Part1(),
    new Day03Part2(),
  ],
  [
    new Day04Part1(),
    new Day04Part2(),
  ]
];

export default solvers;
