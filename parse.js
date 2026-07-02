const xlsx = require('xlsx');

const workbook = xlsx.readFile('d:\\Work\\Loom\\Test Case Loom.xlsx');
const sheetNames = workbook.SheetNames;
console.log('Sheets:', sheetNames);

for (const sheetName of sheetNames) {
  const sheet = workbook.Sheets[sheetName];
  const json = xlsx.utils.sheet_to_json(sheet);
  console.log(`\n--- Sheet: ${sheetName} ---`);
  console.log(JSON.stringify(json, null, 2));
}
