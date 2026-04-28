const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

if (!fs.existsSync('css')) fs.mkdirSync('css');
fs.copyFileSync('public/css/style.css', 'css/style.css');

const pages = [
  { src: 'home', dest: 'index.html' },
  { src: 'about', dest: 'about.html' },
  { src: 'skills', dest: 'skills.html' },
  { src: 'projects', dest: 'projects.html' },
  { src: 'contact', dest: 'contact.html' }
];

pages.forEach(page => {
  let template = fs.readFileSync(path.join('views', page.src + '.ejs'), 'utf8');
  
  template = template.replace(/href="\/"/g, 'href="index.html"');
  template = template.replace(/href="\/about"/g, 'href="about.html"');
  template = template.replace(/href="\/skills"/g, 'href="skills.html"');
  template = template.replace(/href="\/projects"/g, 'href="projects.html"');
  template = template.replace(/href="\/contact"/g, 'href="contact.html"');
  
  // Fix CSS path - use relative path
  template = template.replace(/href="\/css\/style.css"/g, 'href="css/style.css"');
  
  const rendered = ejs.render(template, {});
  fs.writeFileSync(path.join('.', page.dest), rendered);
  console.log('Built: ' + page.dest);
});

console.log('\nBuild complete!');
console.log('Files created:');
console.log(fs.readdirSync('.').filter(f => f.endsWith('.html')));