const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data.json');
const data = require(dataPath);

let found = false;
data.packages = data.packages.map(p => {
  if (p.id === 'tp-wildlife') {
    found = true;
    return { ...p, isDisabled: true };
  }
  return p;
});

if (found) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Disabled tp-wildlife package in data.json');
} else {
  console.log('Package not found.');
}
