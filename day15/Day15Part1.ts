import Day from "../Day";

function taxiDistance(a: number[], b: number[]) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

export default class Day15Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/).map(line => {
      return line.replace('Sensor at x=', '')
        .replace(': closest beacon is at x=', '|')
        .replaceAll('y=', '')
        .split('|')
        .map(item => item.split(', ').map(Number));
    });

    const slices: number[][] = [];
    const YRow = 2000000;
    input.forEach(sensorBeacon => {
      const sensor = sensorBeacon[0];
      const sensorRange = taxiDistance(sensor, sensorBeacon[1]);
      const deltaRowYSensor = sensor[1] - YRow;
      const halfTriangle = sensorRange - Math.abs(deltaRowYSensor);
      if (halfTriangle <= 0) {
        return;
      }
      const slice = [sensor[0] - halfTriangle, sensor[0] + halfTriangle];
      slices.push(slice);
    });

    const XValues = new Set();

    slices.forEach(slice => {
      const workingSlice = [...slice];
      while (workingSlice[0] !== workingSlice[1]) {
        XValues.add(workingSlice[0]);
        workingSlice[0] = workingSlice[0] + 1;
      }
    });

    return XValues.size;
  }
}
