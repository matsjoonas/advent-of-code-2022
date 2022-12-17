export default class ShapeGenerator {
  private counter = 0;

  private shapes = [
    [
      [0, 0], [1, 0], [2, 0], [3, 0],
    ],
    [
      [1, 0], [0, 1], [1, 1], [2, 1], [1, 2],
    ],
    [
      [0, 0], [1, 0], [2, 0], [2, 1], [2, 2],
    ],
    [
      [0, 0], [0, 1], [0, 2], [0, 3],
    ],
    [
      [0, 0], [1, 0], [0, 1], [1, 1]
    ],
  ];

  public emit() {
    const shape = this.shapes[this.counter];
    this.counter++;
    if (this.counter > 4) {
      this.counter = 0;
    }
    return shape;
  }
}
