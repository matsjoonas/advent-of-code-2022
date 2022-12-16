import Day from "../Day";

type State = {
  minLeft: number,
  current: string,
  value: number,
  openValves: string[],
};

export default class Day16Part1 implements Day {
  public solve(rawInput: string): number {
    const input = rawInput.trim().split(/\r\n|\n/)
      .map(line => {
        return line.replace('Valve ', '')
          .replace(' has flow rate=', '|')
          .replace('; tunnels lead to valves ', '|')
          .replace('; tunnel leads to valve ', '|')
          .split('|').map((item, index) => {
            if (index === 2) {
              return item.split(', ');
            }
            if (index === 1) {
              return Number(item);
            }
            return item;
          });
      });
    const valves = new Map();
    input.forEach(row => {
      valves.set(row[0], {
        flow: row[1],
        neighbors: row[2],
      });
    });

    // there's no point in trying to open an already opened valve
    //
    let states: State[] = [
      {
        minLeft: 30,
        current: 'AA',
        value: 0,
        openValves: [],
      }
    ];

    let i = 30;
    while (i) {
      i--;
      console.log(i, states.length);
      let newStates: State[] = [];
      states.forEach(state => {
        if (state.minLeft === 0) {
          newStates.push(state);
          return;
        }
        if (state.minLeft < 0) {
          return;
        }
        valves.get(state.current).neighbors.forEach((neighbor: string) => {
          const value = (state.minLeft - 2) * valves.get(neighbor).flow;
          // do not open
          newStates.push({
            minLeft: state.minLeft - 1,
            current: neighbor,
            value: state.value,
            openValves: [...state.openValves],
          });

          // open
          if ((value > 0) && !state.openValves.includes(neighbor)) {
            newStates.push({
              minLeft: state.minLeft - 2,
              current: neighbor,
              value: state.value + value,
              openValves: [...state.openValves, neighbor],
            });
          }
        });
      });

      const uniques = new Map();
      const filteredStates = newStates.filter(state => {
        if (state.minLeft < 0) {
          return false;
        }
        const key = [state.minLeft.toString(), state.current, state.value.toString(), [...state.openValves].sort().join(',')].join(',');

        if (uniques.get(key)) {
          return false;
        }
        uniques.set(key, true);
        return true;
      }).sort((a, b) => {
        return b.value - a.value;
      });

      if (i < 9) {
        let bestValue = filteredStates[0].value;
        const pruned = filteredStates.filter(state => {
          return state.value >= bestValue;
        });
        states = [...pruned];
      } else {
        states = [...filteredStates];
      }
    }

    const result = states.sort((a, b) => {
      return b.value - a.value;
    })[0];

    return result.value;
  }
}
