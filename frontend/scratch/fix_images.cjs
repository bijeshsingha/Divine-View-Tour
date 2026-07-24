const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data.json');
const data = require(dataPath);

// Map invalid paths to valid ones
const imageMapping = {
  "/images/nongriat-1.jpg": "/images/Meghalaya/39affdeb3cc07e912309c2348728d6f2.jpg",
  "/images/wari-chora-1.jpg": "/images/Gemini_Generated_Image_8ylri98ylri98ylr.png",
  "/images/sikkim-1.jpg": "/images/Gemini_Generated_Image_cnqi2wcnqi2wcnqi.png",
  "/images/khonoma-1.jpg": "/images/Guwahati/Temples/Balaji Temple.jpg",
  "/images/bamboo-trek-1.jpg": "/images/Meghalaya/16965a616fd260417491af59d63cee27.jpg",
  "/images/darjeeling-1.jpg": "/images/Guwahati/View Point.jpg",
};

data.packages.forEach(pkg => {
  if (imageMapping[pkg.image]) {
    pkg.image = imageMapping[pkg.image];
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('Fixed missing images in data.json');
