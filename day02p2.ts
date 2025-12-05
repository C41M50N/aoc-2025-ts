
type Range = { start: number; end: number };

function isValidRange(range: Range): boolean {
  const startDigits = String(range.start);
  const endDigits = String(range.end);
  if (startDigits.length === 1 && endDigits.length === 1) {
    return false;
  }
  return true;
}

function isRepeatingSequence(numStr: string): boolean {
  for (let seqLen = 1; seqLen <= Math.floor(numStr.length / 2); seqLen++) {
    const sequence = numStr.slice(0, seqLen);
    if (!Number.isInteger(numStr.length / seqLen)) {
      continue; // Skip if numStr length is not a multiple of seqLen
    }
    const repetitions = Math.floor(numStr.length / seqLen);
    const constructed = sequence.repeat(repetitions);
    // console.log(`Checking if numStr: ${numStr} equals constructed: ${constructed} from sequence: ${sequence} repeated ${repetitions} times`);
    if (constructed === numStr) {
      return true;
    }
  }
  return false;
}

const input = await Bun.file('./inputs/day02/input.txt').text();
const ranges: Range[] = input.trim().split(',').map(line => {
  const [startStr, endStr] = line.split('-');
  return { start: parseInt(startStr!, 10), end: parseInt(endStr!, 10) };
}).filter(isValidRange);

let validSum = 0;
for (const range of ranges) {
  for (let num = range.start; num <= range.end; num++) {
    const numStr = String(num);
    if (isRepeatingSequence(numStr)) {
      validSum += num;
    }
  }
}

console.log(`Number of valid passwords: ${validSum}`);
console.log(`Total ranges processed: ${ranges.length}`);
