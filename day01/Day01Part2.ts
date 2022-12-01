import Day from "../Day";
import Team from "./Team";

export default class Day01Part2 implements Day {
  public solve(rawInput: string): number {
    const team = new Team(rawInput);
    const calorieList: Float64Array = team.memberCalories.sort();

    return calorieList[calorieList.length - 1] +
      calorieList[calorieList.length - 2] +
      calorieList[calorieList.length - 3];
  }
}
