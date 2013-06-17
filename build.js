var fs = require('fs');
var marked = require('marked');

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  langPrefix: 'language-'
});

var file = fs.readFileSync('./_index.html', 'utf-8');

var matches = file.match(/<\!\-\-MD\s+([^\s]+)\s+\-\->/ig);
matches.forEach(function (match) {
  console.log("parsing: " + match.replace('<!--MD ', '').replace(' -->', '') + '.md');
  file = file.replace(match, marked(fs.readFileSync('./' + match.replace('<!--MD ', '').replace(' -->', '') + '.md', 'utf-8')) );
});

fs.writeFileSync('./index.html', file);

console.log("Done!");