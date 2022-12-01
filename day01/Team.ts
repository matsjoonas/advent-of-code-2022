export default class Team {
  private readonly _memberCalories: Float64Array;

  constructor(rawInput: string) {
    this._memberCalories = this.parseCalories(rawInput);
  }

  private parseCalories(rawInput: string): Float64Array {
    const input = rawInput.trim()
      .split('\r\n\r\n')
      .map(group =>
        group.split('\r\n')
          .reduce((acc, curr) => acc + parseInt(curr), 0)
      );

    // Sorting TypedArrays is much faster than passing a compare function
    // to regular Array sort
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
    return new Float64Array(input);
  }

  get memberCalories(): Float64Array {
    return this._memberCalories;
  }
}
