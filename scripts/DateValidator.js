// @ts-nocheck
'use strict';

class DateValidator {
  isValidMonth(month) {
    return month === 11;
  }

  isValidDay(day) {
    return day >= 1 && day <= 25;
  }

  isValidYear(year) {
    return year >= 2015;
  }

  validate(userProvidedDate) {
    const validationResult = {
      pass: true,
      message: null,
    };

    if (!this.isValidYear(userProvidedDate.getFullYear())) {
      validationResult.pass = false;
      validationResult.message = 'This is not a valid year for Advent of Code. First Advent of Code was held in 2015.';
      return validationResult;
    }

    if (!this.isValidMonth(userProvidedDate.getMonth()) || !this.isValidDay(userProvidedDate.getDate())) {
      validationResult.pass = false;
      validationResult.message = 'Date must fall between December 1-25';
      return validationResult;
    }

    const currentDate = new Date();

    return validationResult;
  }
}

module.exports = DateValidator;
