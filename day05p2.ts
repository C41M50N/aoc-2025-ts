
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

  overlaps(other: Range): boolean {
    return this.start <= other.end && other.start <= this.end;
  }

  union(other: Range): Range | null {
    if (!this.overlaps(other)) {
      return null;
    }
    const newStart = Math.min(this.start, other.start);
    const newEnd = Math.max(this.end, other.end);
    return new Range(newStart, newEnd);
  }

  length(): number {
    return this.end - this.start + 1;
  }
}

function simplifyRanges(ranges: Range[]): Range[] {
  for (let i = 0; i < ranges.length; i++) {
    for (let j = 0; j < ranges.length; j++) {
      if (i === j) continue;
      if (ranges[i]!.overlaps(ranges[j]!)) {
        const union = ranges[i]!.union(ranges[j]!);
        if (union) {
          ranges.splice(j, 1);
          ranges[i] = union;
          return simplifyRanges(ranges);
        }
      }
    }
  }
  return ranges;
}

// const startRanges: Range[] = [new Range(10, 14), new Range(16, 20), new Range(12, 18)];
// console.log('Simplified Ranges:', simplifyRanges(startRanges));

const input = await Bun.file('./inputs/day05/input.txt').text();
const ranges: Range[] = input.trim().split('\n\n')[0]!.split('\n').map(line => {
  const [startStr, endStr] = line.trim().split('-');
  return new Range(parseInt(startStr!, 10), parseInt(endStr!, 10));
});

console.log('Simplified Ranges:', simplifyRanges(ranges));
console.log('Total Length:', simplifyRanges(ranges).reduce((acc, range) => acc + range.length(), 0));
