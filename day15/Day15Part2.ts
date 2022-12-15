import Day from "../Day";

function taxiDistance(a: number[], b: number[]) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function inRange(range: number[], needle: number) {
  return needle >= range[0] && needle <= range[1];
}

export default class Day15Part2 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/).map(line => {
      return line.replace('Sensor at x=', '')
        .replace(': closest beacon is at x=', '|')
        .replaceAll('y=', '')
        .split('|')
        .map(item => item.split(', ').map(Number));
    });

    const YMax = 4000000;
    const XMax = 4000000;
    let distressBeacon = [0, 0];
    for (let y = 0; y < YMax; y++) {
      let slices: number[][] = [];
      input.forEach(sensorBeacon => {
        const sensor = sensorBeacon[0];
        const sensorRange = taxiDistance(sensor, sensorBeacon[1]);
        const deltaRowYSensor = sensor[1] - y;
        const halfTriangle = sensorRange - Math.abs(deltaRowYSensor);
        if (halfTriangle <= 0) {
          return;
        }
        const slice = [sensor[0] - halfTriangle, sensor[0] + halfTriangle];
        if (slice[0] < 0) {
          slice[0] = 0;
        }
        if (slice[1] > XMax) {
          slice[1] = XMax;
        }
        slices.push(slice);
      });
      slices = slices.sort((a, b) => a[0] - b[0]);

      let found = false;
      slices.forEach(slice => {
        // distress beacon can possibly only be at a location that touches the edge of the triangle
        const beaconMinPossibleX = slice[0] - 1;
        const beaconMaxPossibleX = slice[1] + 1;
        if (beaconMinPossibleX < 0 || beaconMaxPossibleX > XMax) {
          return;
        }
        const maxLocationMatches = slices.findIndex(slice => {
          return inRange(slice, beaconMaxPossibleX);
        });
        const minLocationMatches = slices.findIndex(slice => {
          return inRange(slice, beaconMinPossibleX);
        });
        if (minLocationMatches === -1) {
          found = true;
          distressBeacon = [beaconMinPossibleX, y];
          return;
        }
        if (maxLocationMatches === -1) {
          found = true;
          distressBeacon = [beaconMaxPossibleX, y];
          return;
        }
      });

      if (found) {
        break;
      }
    }

    console.log(distressBeacon);
    return distressBeacon[0] * 4000000 + distressBeacon[1];
  }
}
