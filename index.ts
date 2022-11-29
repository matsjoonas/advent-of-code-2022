import Day01Part1 from './Day01/Day01Part1';

// should probs be a separate file for easier generation
const solvers = [
  Day01Part1,
]

const solver = new solvers[0];

// get daynumber from the console command
// new AocSuite(array of Solvers)
// inputfile path not needed, we can guess it from the dayNumber
// AocSuite.solve(dayNumber, logToConsole)

const answer = solver.solve('asfasdf');
console.log(answer);
