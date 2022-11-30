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

function createGetPath(dayFolderName) {
  function getPath(subPath) {
    let segment = `../${dayFolderName}`;
    if (subPath) {
      segment += `/${subPath}`;
    }
    return path.resolve(__dirname, segment);
  }
  return getPath;
}

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

  let dayString = date.getDate().toString();
  if (dayString.length === 1) {
    dayString = '0' + dayString;
  }

  const dayFolderName = 'day' + dayString;
  const getPath = createGetPath(dayFolderName);
  const fullDayPath = path.resolve(__dirname, `../${dayFolderName}`);
  if (fs.existsSync(getPath())) {
    throw new Error(`Directory already exists: ${getPath()}`);
  }

  inform('\nCreating day root folder');
  fs.mkdirSync(getPath());
  inform('\nCreating input file');
  fs.writeFileSync(getPath(`input${dayString}.txt`), '')
  inform('\nCreating tests folder');
  fs.mkdirSync(getPath('tests'));
  inform('\nCreating test input file');
  fs.writeFileSync(getPath(`tests/day${dayString}TestInput1.txt`), '')
}

main().catch((err) => {
  console.error(err);
});
