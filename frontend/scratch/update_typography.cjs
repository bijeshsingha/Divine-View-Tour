const fs = require('fs');
const path = require('path');
const SRC_DIR = path.join(process.cwd(), 'src');
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(file => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else if (file.endsWith('.jsx')) {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });
  return arrayOfFiles;
}
const files = getAllFiles(SRC_DIR);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let orig = content;
  content = content.replace(/<h1 className="/g, '<h1 className="font-serif ');
  content = content.replace(/<h2 className="/g, '<h2 className="font-serif ');
  if (orig !== content) {
    fs.writeFileSync(file, content);
    console.log('Typography updated in ' + file);
  }
});
