import yargs from 'yargs';
import got from 'got';
import {hideBin} from "yargs/helpers";
import * as dotenv from 'dotenv';
import chalk from 'chalk';
import path from 'path';
import * as url from 'url';
dotenv.config({
  path: 'scripts/.env',
})
import DateValidator from './DateValidator.js';
import fs from 'fs';
const argv = yargs(hideBin(process.argv)).argv;
const inform = (message) => console.log(chalk.cyan(message));
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

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

  inform('\nStarting to prep for date: ' + date.toDateString());

  let day = date.getDate().toString();
  if (day.length === 1) {
    day = '0' + day;
  }

  const fullPath = path.resolve(__dirname, `../day${day}`);
  if (fs.existsSync(fullPath)) {
    throw new Error(`Directory already exists: ${fullPath}`);
  }
}

main().catch((err) => {
  console.error(err);
});
