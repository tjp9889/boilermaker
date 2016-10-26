var Condition = require('./Condition.js').Condition;
var Repeat = require('./Repeat.js').Repeat;
var With = require('./With.js').With;
var Line = require('./Line.js').Line;
var File = require('./File.js').File;

function Template(filename)
{
    this.filename = filename;
    this.evaluationTreeRoot;
}

module.exports = {
    Template: Template,
    Condition: Condition,
    Repeat: Repeat,
    With: With,
    Line: Line,
    File: File
};
