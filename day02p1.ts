
type Range = { start: number; end: number };

function isValidRange(range: Range): boolean {
  const startDigits = String(range.start);
  const endDigits = String(range.end);
  if (startDigits.length % 2 !== 0 && startDigits.length === endDigits.length) {
    return false;
  }
  return true;
}

const input = await Bun.file('./inputs/day02/input_ex.txt').text();
const ranges: Range[] = input.trim().split(',').map(line => {
  const [startStr, endStr] = line.split('-');
  return { start: parseInt(startStr!, 10), end: parseInt(endStr!, 10) };
}).filter(isValidRange);

let validSum = 0;
for (const range of ranges) {
  for (let num = range.start; num <= range.end; num++) {
    const numStr = String(num);
    if (numStr.length % 2 !== 0) continue;

    const left = numStr.slice(0, numStr.length / 2);
    const right = numStr.slice(numStr.length / 2);

    if (left === right) {
      validSum += num;
    }
  }
}

console.log(`Number of valid passwords: ${validSum}`);
console.log(`Total ranges processed: ${ranges.length}`);
