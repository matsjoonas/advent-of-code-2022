import Day from "../Day";

function drawPixel(cycle: number, spritePosition: number, crt: string[][]) {
  const row = Math.floor((cycle - 1) / 40);
  const colIdx = (cycle - (row * 40)) - 1;
  let pixelToRender = ' ';
  if (spritePosition - 1 === colIdx || spritePosition === colIdx || spritePosition + 1 === colIdx) {
    pixelToRender = '#';
  }
  crt[row][colIdx] = pixelToRender;
}

export default class Day10Part2 implements Day {
  public solve(rawInput: string): string[] {
    const input = rawInput.trim().split(/\r\n|\n/);
    const crt = [];
    for (let i = 0; i < 6; i++) {
      crt.push('########################################'.split('').map(() => '_'));
    }
    // the CRT draws a single pixel during each cycle
    let cycle = 1;
    let registerX = 1;
    for (let i = 0; i < input.length; i++) {
      const instr = input[i].split(' ');
      if (instr[0] === 'noop') {
        drawPixel(cycle, registerX, crt);
        cycle ++;
      } else {
        drawPixel(cycle, registerX, crt);
        cycle++;
        drawPixel(cycle, registerX, crt);
        cycle++;
        registerX += Number(instr[1]);
      }
    }

    return crt.map(line => line.join(''));
  }
}
