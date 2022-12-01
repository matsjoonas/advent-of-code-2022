import Day from "../Day";
import Team from "./Team";

export default class Day01Part1 implements Day {
  public solve(rawInput: string): number {
    const team = new Team(rawInput);
    const calorieList: Float64Array = team.memberCalories;
    return calorieList.sort()[calorieList.length - 1];
  }
}
