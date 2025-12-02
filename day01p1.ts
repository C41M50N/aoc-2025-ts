
type DialOperation =
  | { type: 'left'; distance: number }
  | { type: 'right'; distance: number };

class Dial {
  public position: number;
  public zeroCount: number = 0;

  constructor(startingPosition: number = 50) {
    this.position = startingPosition;
  }

  move(operation: DialOperation): void {
    if (operation.type === 'left') {
      this.position = (this.position - operation.distance % 100 + 100) % 100;
    } else if (operation.type === 'right') {
      this.position = (this.position + operation.distance) % 100;
    }

    if (this.position === 0) {
      this.zeroCount += 1;
    }
  }
}

const dial = new Dial();

// dial.move({ type: 'right', distance: 50 });
// console.log(dial.position); // Expected output: 0

// dial.move({ type: 'left', distance: 30 });
// console.log(dial.position); // Expected output: 70

// use bun API to read from input file
const input = await Bun.file('./inputs/day01/input.txt').text();
const operations: DialOperation[] = input.trim().split('\n').map(line => {
  const direction = line[0];
  const distance = parseInt(line.slice(1), 10);
  return { type: direction === 'L' ? 'left' : 'right', distance };
});

for (const operation of operations) {
  dial.move(operation);
}

console.log(`Final Position: ${dial.position}`);
console.log(`Zero Count: ${dial.zeroCount}`);
