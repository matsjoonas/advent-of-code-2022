export default class HiveMind {
  private counter = 0;

  private conditions = [
    {
      proposal: 'N',
      mustBeFree: ['N', 'NE', 'NW'],
    },
    {
      proposal: 'S',
      mustBeFree: ['S', 'SE', 'SW'],
    },
    {
      proposal: 'W',
      mustBeFree: ['W', 'NW', 'SW'],
    },
    {
      proposal: 'E',
      mustBeFree: ['E', 'NE', 'SE'],
    }
  ]

  public proposeDirection(blocked: string[]) {
    let proposedDirection = '';

    for (let i = 0; i < this.conditions.length; i++) {
      const condition = this.conditions[(i + this.counter) % this.conditions.length];
      const [a, b, c] = condition.mustBeFree;
      if (!blocked.includes(a) && !blocked.includes(b) && !blocked.includes(c)) {
        proposedDirection = condition.proposal;
        break;
      }
    }

    return proposedDirection;
  }

  public increment() {
    this.counter++;
    if (this.counter > this.conditions.length - 1) {
      this.counter = 0;
    }
  }
}
