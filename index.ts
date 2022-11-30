import yargs from 'yargs/yargs';
import {hideBin} from "yargs/helpers";
import AocSuite from "./AocSuite";
import solvers from "./solvers";

const suite = new AocSuite(solvers);

const argv = yargs(hideBin(process.argv)).argv;
// @ts-ignore
const day: number = argv.day;
// @ts-ignore
const part: number = argv.part;
suite.solve(day, part, true);
