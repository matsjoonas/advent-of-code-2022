// @ts-nocheck
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const path = require('path');
const fs = require('fs');
const {generateTemplateFilesBatch} = require('generate-template-files');

require('dotenv').config({
  path: 'scripts/.env',
});
const DateValidator = require('./DateValidator.js');

const inform = (message) => console.log(message);

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

const generateDayClass = (dayClassName, dayFolderName) => {
  return generateTemplateFilesBatch([
    {
      option: 'Day Class',
      defaultCase: '(pascalCase)',
      entry: {
        folderPath: './scripts/templates/__dayname__.ts',
      },
      dynamicReplacers: [
        {slot: '__dayname__', slotValue: dayClassName},
      ],
      output: {
        path: `./${dayFolderName}/__dayname__.ts`,
        pathAndFileNameDefaultCase: '(pascalCase)',
      },
    },
  ]);
};

const generateDayTest = (dayTestName, dayClassName, day, dayFolderName) => {
  return generateTemplateFilesBatch([
    {
      option: 'Day Class',
      defaultCase: '(pascalCase)',
      entry: {
        folderPath: './scripts/templates/__daytestname__.test.ts',
      },
      dynamicReplacers: [
        {slot: '__daytestname__', slotValue: dayTestName},
        {slot: '__dayclassname__', slotValue: dayClassName},
        {slot: '__day__', slotValue: day},
      ],
      output: {
        path: `./${dayFolderName}/tests/__daytestname__.test.ts`,
        pathAndFileNameDefaultCase: '(camelCase)',
      },
    },
  ]);
};

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
  fs.writeFileSync(getPath(`tests/day${dayString}TestInput1.txt`), '');

  await generateDayClass(`Day${dayString}Part1`, dayFolderName);
  await generateDayClass(`Day${dayString}Part2`, dayFolderName);
  await generateDayTest(`day${dayString}Part1`, `Day${dayString}Part1`, dayString, dayFolderName);
  await generateDayTest(`day${dayString}Part2`, `Day${dayString}Part2`, dayString, dayFolderName);
}

main().catch((err) => {
  console.error(err);
});
