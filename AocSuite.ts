import * as fs from 'fs';
import 'colors';
import Day from "./Day";

class AocSuite {
  private readonly solvers: Day[][];

  constructor(solvers: Day[][]) {
    this.solvers = solvers;
  }

  private getInputPath(day: number): string {
    let dayId: string = day.toString();
    if (dayId.length === 1) {
      dayId = '0' + dayId;
    }
    return `./Day${dayId}/input${dayId}.txt`;
  }

  public solve(day: number, part: number = 1, log: boolean = false): number | string {
    const data = fs.readFileSync(this.getInputPath(day));
    const solver = this.solvers[day - 1][part - 1];
    let startStamp: number = 0;
    let endStamp: number = 0;
    startStamp = Date.now();
    const answer = solver.solve(data.toString());
    endStamp = Date.now();

    if (log) {
      console.log('__________________________________'.blue);
      console.log('The answer is: ')
      console.log(answer);

      const totalTime = endStamp - startStamp;
      console.log('__________________________________'.blue);
      console.log('Execution time in ms:')
      console.log(totalTime)
    }
    return answer;
  }
}

export default AocSuite;
