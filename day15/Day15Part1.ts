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

    // get the grid size
    const gridLeftCorner = [0, 0];
    const gridRightCorner = [0, 0];
    input.forEach(sensorBeacon => {
      sensorBeacon.forEach(node => {
        if (node[0] < gridLeftCorner[0]) {
          gridLeftCorner[0] = node[0];
        }
        if (node[1] < gridLeftCorner[1]) {
          gridLeftCorner[1] = node[1];
        }

        if (node[0] > gridRightCorner[0]) {
          gridRightCorner[0] = node[0];
        }

        if (node[1] > gridRightCorner[1]) {
          gridRightCorner[1] = node[1];
        }
      });
    });

    const slices: number[][] = [];
    const YRow = 10;
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

    console.log(slices);

    return 0;
  }
}
