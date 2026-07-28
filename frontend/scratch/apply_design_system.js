import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.jsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  
  return arrayOfFiles;
}

const files = getAllFiles(SRC_DIR);

const replacements = [
  [/bg-brand-dark/g, 'bg-primary-dark'],
  [/bg-brand/g, 'bg-primary'],
  [/text-brand-dark/g, 'text-primary-dark'],
  [/text-brand-light/g, 'text-primary-dark'],
  [/text-brand/g, 'text-primary'],
  [/border-brand-dark/g, 'border-primary-dark'],
  [/border-brand/g, 'border-primary'],
  [/shadow-brand/g, 'shadow-primary'],
  
  [/bg-amber-400/g, 'bg-secondary'],
  [/bg-amber-500/g, 'bg-secondary'],
  [/bg-amber-600/g, 'bg-secondary-dark'],
  [/bg-amber-100/g, 'bg-stone-50'],
  [/bg-amber-50/g, 'bg-stone-50'],
  
  [/text-amber-400/g, 'text-secondary'],
  [/text-amber-500/g, 'text-secondary'],
  [/text-amber-600/g, 'text-secondary'],
  [/text-amber-700/g, 'text-secondary-dark'],
  [/text-amber-800/g, 'text-secondary-dark'],
  [/text-amber-900/g, 'text-secondary-dark'],
  
  [/border-amber-100/g, 'border-stone-100'],
  [/border-amber-200/g, 'border-stone-200'],
  [/border-amber-400/g, 'border-secondary'],
  [/border-amber-500/g, 'border-secondary'],
  
  [/shadow-amber-100/g, 'shadow-stone-100'],
  [/shadow-amber-500\/30/g, 'shadow-secondary/30'],
  
  [/bg-slate-50/g, 'bg-background'],
  [/bg-slate-100/g, 'bg-stone-50'],
  [/bg-slate-200/g, 'bg-stone-100'],
  [/bg-slate-800/g, 'bg-foreground'],
  [/bg-slate-900/g, 'bg-foreground'],
  
  [/text-slate-50/g, 'text-background'],
  [/text-slate-500/g, 'text-stone-500'],
  [/text-slate-600/g, 'text-stone-600'],
  [/text-slate-700/g, 'text-stone-700'],
  [/text-slate-800/g, 'text-foreground'],
  [/text-slate-900/g, 'text-foreground'],
  [/text-slate-950/g, 'text-foreground'],
  
  [/border-slate-100/g, 'border-stone-100'],
  [/border-slate-200/g, 'border-stone-200'],
  
  [/rounded-3xl/g, 'rounded-2xl'],
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  replacements.forEach(([pattern, replacement]) => {
    content = content.replace(pattern, replacement);
  });
  
  if (original !== content) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${path.basename(file)}`);
  }
});
