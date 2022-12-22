export default class Logger {
  private on: boolean = true;

  public log(...args: any[]) {
    if (!this.on) {
      return;
    }
    console.log(...args);
  }

  public turnOff() {
    this.on = false;
  }
}
