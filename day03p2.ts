
function buildLargestSubBank(bank: number[], targetLen: number, l: number, subBank: number[]): number[] {
  if (subBank.length === targetLen) {
    return subBank;
  }

  const remaining = targetLen - subBank.length;
  let largest = bank[l]!;
  let largestIdx = l;
  for (let i = l+1; i < bank.length - remaining + 1; i++) {
    const bat = bank[i]!;
    if (bat > largest) {
      largest = bat;
      largestIdx = i;
    }
  }

  return buildLargestSubBank(bank, targetLen, largestIdx + 1, [...subBank, largest]);
}

// const bank = [8,1,1,1,1,1,1,1,1,1,1,1,1,1,9];
// const bank = [8,1,8,1,8,1,9,1,1,1,1,2,1,1,1];
// const bank = [2,3,4,2,3,4,2,3,4,2,3,4,2,7,8];
// console.log(`Max Joltage: ${parseInt(buildLargestSubBank(bank, 12, 0, []).join(''), 10)}`);

const input = await Bun.file('./inputs/day03/input.txt').text();
const banks = input.trim().split('\n').map(line => 
  line.trim().split('').map(numStr => parseInt(numStr, 10))
);

let totalOutputJotlage = 0;
for (const bank of banks) {
  const bankJoltage = parseInt(buildLargestSubBank(bank, 12, 0, []).join(''), 10);
  console.log(`Bank: ${bank} has max joltage: ${bankJoltage}`);
  totalOutputJotlage += bankJoltage;
}

console.log(`Total Output Joltage: ${totalOutputJotlage}`);
