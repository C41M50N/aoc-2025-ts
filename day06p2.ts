const input = await Bun.file('./inputs/day06/input.txt').text();

const matrix: string[][] = input.split('\n').map(line =>
  line.split('')
);
// console.log('Matrix:', matrix);

let worksheetTotal = 0;

let i = 0;
while (i < matrix[0]!.length) {
  const operation = matrix[ matrix.length - 1 ]![i]!;

  const col: string[] = [];
  while (!matrix.map(row => row[i]!).every(char => char === ' ')) {
    col.push(matrix.map(row => row[i]!).join('').slice(0, -1));
    i++;
    if (i >= matrix[0]!.length) break;
  }
  // console.log('Constructed Column Rows:', col);
  // console.log(`Column ${i}:\n${col.join('\n')}`);
  
  const constructedCol: number[] = col.map(str => parseInt(str.trim(), 10));
  // console.log('Constructed Column Numbers:', constructedCol);
  if (operation === '+') {
    worksheetTotal += constructedCol.reduce((acc, num) => acc + num, 0);
  } else {
    worksheetTotal += constructedCol.reduce((acc, num) => acc * num, 1);
  }
  
  i++;
}

console.log('Worksheet Total:', worksheetTotal);
