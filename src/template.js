var Condition = require('./Condition.js').Condition;
var Repeat = require('./Repeat.js').Repeat;
var With = require('./With.js').With;
var Line = require('./Line.js').Line;
var File = require('./File.js').File;
var Root = require('./Root.js').Root;

var fs = require('fs');
var readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('sample.txt')
});

rl.on('line', (line) => {
  console.log('Line from file:', line);
});

function Template(filename)
{
    this.filename = filename;
    this.treeRoot = new Root({ _filename: filename});
}

module.exports = {
    Template: Template,
    Condition: Condition,
    Repeat: Repeat,
    With: With,
    Line: Line,
    File: File,
    Root: Root
};
