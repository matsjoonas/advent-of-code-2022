import yargs from 'yargs';
import got from 'got';
import {hideBin} from "yargs/helpers";
import * as dotenv from 'dotenv'
dotenv.config({
  path: 'scripts/.env',
})
import DateValidator from './DateValidator.js';
const argv = yargs(hideBin(process.argv)).argv;

async function main() {
  let date;
  const dateValidator = new DateValidator();
  if (argv.date) {
    date = new Date(argv.date);
  } else {
    date = new Date();
  }

  const validationResult = dateValidator.validate(date);
  if (!validationResult.pass) {
    throw new Error(validationResult.message);
  }


}

main().catch((err) => {
  console.error(err);
});
