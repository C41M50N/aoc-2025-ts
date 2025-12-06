
function findMaxJoltage(bank: number[]): number {
  let maxJoltage = 0;

  for (let i = 9; i >= 1; i--) {
    for (let j = 0; j < bank.length-1; j++) {
      if (i === bank[j]) {
        // we've found the next heightest single battery
        // so now we check all batteries to the right to create pairs (joltage)
        for (let k = j + 1; k < bank.length; k++) {
          const joltage = parseInt(`${bank[j]}${bank[k]}`, 10);
          // console.log(`Checking batteries at index ${j} and ${k} for joltage: ${joltage}`);
          if (joltage > maxJoltage) {
            maxJoltage = joltage;
          }
        }
        return maxJoltage;
      }
    }
  }

  return -1;
}

// const bank = [8,1,1,1,1,1,1,1,1,1,1,1,1,1,9];
// const bank = [8,1,8,1,8,1,9,1,1,1,1,2,1,1,1];
// console.log(`Max Joltage: ${findMaxJoltage(bank)}`);

const input = await Bun.file('./inputs/day03/input.txt').text();
const banks = input.trim().split('\n').map(line => 
  line.trim().split('').map(numStr => parseInt(numStr, 10))
);

let totalOutputJotlage = 0;
for (const bank of banks) {
  const bankJoltage = findMaxJoltage(bank);
  console.log(`Bank: ${bank} has max joltage: ${bankJoltage}`);
  totalOutputJotlage += bankJoltage;
}

console.log(`Total Output Joltage: ${totalOutputJotlage}`);
