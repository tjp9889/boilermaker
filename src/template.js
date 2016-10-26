var fs = require('fs');
var readline = require('readline');

var Condition = require('./Condition.js').Condition;
var Repeat = require('./Repeat.js').Repeat;
var With = require('./With.js').With;
var Line = require('./Line.js').Line;
var File = require('./File.js').File;
var Root = require('./Root.js').Root;

function readAndParseFileLines(filename, callback)
{
    var lines = fs.readFileSync(filename).toString().replace(/\r\n/g,'\n').split('\n');
    for (var num in lines)
    {
        parseLine(num, lines[num], callback);
    }
}

function parseLine(lineNumber, line, callback)
{
    var result = {number: lineNumber, type: 'line', param: line};
    var newStr = line.replace(/\$\$\$\s*(end|repeat|if|with|file)\s*(.*?)\s*\$\$\$/g,
    function(str, p1, p2) {
      result.type = p1;
      result.param = p2;
      return "";
    });
    callback(result);
    return result;
}

function Template(filename)
{
    this.filename = filename;
    this.treeRoot = new Root({ _filename: filename});
    this.contextStack = [];
    this.currentContext = this.treeRoot;

    this.onLine = function(lineInfo)
    {
        if (lineInfo.type == 'line')
        {
            this.currentContext.insert(new Line(lineInfo.param));
        }
        else if (lineInfo.type == 'if')
        {
            var conditionBlock = new Condition(lineInfo.param);
            this.currentContext.insert(conditionBlock);
            this.contextStack.push(this.currentContext);
            this.currentContext = conditionBlock;
        }
        else if (lineInfo.type == 'repeat')
        {
            var repeatBlock = new Repeat(lineInfo.param);
            this.currentContext.insert(repeatBlock);
            this.contextStack.push(this.currentContext);
            this.currentContext = repeatBlock;
        }
        else if (lineInfo.type == 'with')
        {
            var withBlock = new With(lineInfo.param);
            this.currentContext.insert(withBlock);
            this.contextStack.push(this.currentContext);
            this.currentContext = withBlock;
        }
        else if (lineInfo.type == 'file')
        {
            var fileBlock = new File(lineInfo.param);
            this.currentContext.insert(fileBlock);
            this.contextStack.push(this.currentContext);
            this.currentContext = fileBlock;
        }
        else if (lineInfo.type == 'end')
        {
            this.currentContext = this.contextStack.pop();
        }
    }

    this.executeWithFile = function(filename)
    {
        this.execute(JSON.parse(fs.readFileSync(filename)));
    }

    this.execute = function(config)
    {
        this.treeRoot.execute(config);
    }

    var self = this;
    readAndParseFileLines(filename, function(lineInfo) { self.onLine(lineInfo) });
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
