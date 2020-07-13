const md = require('markdown-it')();
const fs = require('fs');


const result = md.render('# markdown-it WIP!');

fs.writeFile('README.md', result, function (err) {
  if (err) return console.log(err);
  console.log(`${result} > README.md`);
});