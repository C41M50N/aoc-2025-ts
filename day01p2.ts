
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
    // how many times we pass through zero
    if (operation.type === 'right' && this.position + operation.distance >= 100) {
      this.zeroCount += Math.floor((this.position + operation.distance) / 100);
    } else if (operation.type === 'left' && this.position - operation.distance <= 0) {
      // When starting at 0, we don't count that zero, but we still count if we wrap around and pass/land on zero again
      if (this.position === 0) {
        this.zeroCount += Math.floor((operation.distance - 1) / 100);
      } else {
        this.zeroCount += Math.floor((operation.distance - this.position) / 100) + 1;
      }
    }

    if (operation.type === 'left') {
      this.position = (this.position - operation.distance % 100 + 100) % 100;
    } else if (operation.type === 'right') {
      this.position = (this.position + operation.distance) % 100;
    }

    // console.log(`The dial is rotated ${operation.type === 'left' ? 'L' : 'R'}${operation.distance} to point at ${this.position}`);
    // console.log(`Zero Count: ${this.zeroCount}`);
  }
}

const dial = new Dial();

// dial.move({ type: 'right', distance: 1000 });
// console.log(dial.position); // Expected output: 0
// console.log(dial.zeroCount); // Expected output: 10

// dial.move({ type: 'right', distance: 49 });
// dial.move({ type: 'left', distance: 99 });
// console.log(dial.position); // Expected output: 0
// console.log(dial.zeroCount); // Expected output: 1

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
