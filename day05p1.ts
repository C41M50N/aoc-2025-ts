
class Range {
  public start: number;
  public end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  contains(value: number): boolean {
    return value >= this.start && value <= this.end;
  }
}


const input = await Bun.file('./inputs/day05/input.txt').text();
const ranges: Range[] = input.trim().split('\n\n')[0]!.split('\n').map(line => {
  const [startStr, endStr] = line.trim().split('-');
  return new Range(parseInt(startStr!, 10), parseInt(endStr!, 10));
});
const ingredientIds = input.trim().split('\n\n')[1]!.split('\n').map(line => parseInt(line.trim(), 10));

let validCount = 0;
for (const id of ingredientIds) {
  if (ranges.some(range => range.contains(id))) {
    validCount++;
  }
}

console.log(`Total fresh ingredient IDs: ${validCount}`);
