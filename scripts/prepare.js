/*
.env
  year=2022

take year from env
check date
if dates year matches from 1-24 days
if no match ask to manually enter the date yyyy-mm-dd

check if folder exists for the date
if no folder
part 1
else part 2
prefill date and folder, and ask to confirm
 */
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers')
require('dotenv').config({
  path: 'scripts/.env',
});
const argv = yargs(hideBin(process.argv)).argv;


async function main() {
  if (argv.date) {
    validateDate(argv.date);
  } else {

  }
}

function validateDate(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth();
  const day = date.getDate();
  if (month !== 11) {

  }
}

main().catch((err) => {
  console.error(err);
});
