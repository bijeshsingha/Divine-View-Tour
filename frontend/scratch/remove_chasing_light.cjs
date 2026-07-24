const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data.json');
const data = require(dataPath);

const originalLength = data.packages.length;
data.packages = data.packages.filter(p => p.title !== 'Chasing Light in the Northeast');
const newLength = data.packages.length;

if (newLength < originalLength) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Successfully removed ${originalLength - newLength} instances of "Chasing Light in the Northeast".`);
} else {
  console.log('Package not found.');
}
