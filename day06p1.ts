
function transpose<T>(matrix: T[][]): T[][] {
  return matrix[0]!.map((_, colIndex) => matrix.map(row => row[colIndex]!));
}

const input = await Bun.file('./inputs/day06/input.txt').text();
const numbers: number[][] = input.trim().split('\n').slice(0, -1).map(line =>
  line.trim()
    .split(' ')
    .filter((str) => str.trim().length > 0)
    .map(numStr => parseInt(numStr!.trim(), 10))
);

type Operation = 'ADD' | 'MULTIPLY';
const operations: Operation[] = input.trim().split('\n').splice(-1)[0]!.trim()
  .split(' ')
  .filter((str) => str.trim().length > 0)
  .map(opStr => {
    const op = opStr.trim();
    if (op === '+') return 'ADD';
    if (op === '*') return 'MULTIPLY';
    throw new Error(`Unknown operation: ${op}`);
  });

// console.log(transpose(numbers));
// console.log('Operations:', operations);

let worksheetTotal = 0;
for (const [idx, col] of transpose(numbers).entries()) {
  const operation = operations[idx]!;
  if (operation === 'ADD') {
    worksheetTotal += col.reduce((acc, num) => acc + num, 0);
  } else if (operation === 'MULTIPLY') {
    worksheetTotal += col.reduce((acc, num) => acc * num, 1);
  }
}
console.log('Worksheet Total:', worksheetTotal);
