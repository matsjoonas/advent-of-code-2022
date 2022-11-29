import * as fs from 'fs';
import 'colors';
import path from "path";

class AocSuite {
  public solver: (data: string | Buffer) => string;
  private readonly inputPath: string;

  constructor(config: any) {
    this.solver = config.solver;
    if (config.inputPath.charAt(0) !== '.') {
      this.inputPath = __dirname + '/' + config.inputPath;
    } else {
      this.inputPath = config.inputPath;
    }
  }

  solve(log: boolean = false): number | string {
    const data = fs.readFileSync(this.inputPath);
    let startStamp = 0;
    let endStamp = 0;
    startStamp = Date.now();
    const answer = this.solver(data);
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
