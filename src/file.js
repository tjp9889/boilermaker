var evalExpr = require('./evaluator.js').evalExpr;

var fs = require('fs');
var path = require('path');

function ensureDirectoryExistence(filePath)
{
    var dirname = path.dirname(filePath);
    if (directoryExists(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function directoryExists(path)
{
    try {
        return fs.statSync(path).isDirectory();
    }
    catch (err) {
        return false;
    }
}

function writeStringToFile(fileName, contents)
{
    ensureDirectoryExistence(fileName);
    fs.writeFile(fileName, contents, function(err)
    {
        if (err)
        {
            console.log("Could not write " + fileName + " :" + err);
        }
    });
}

function File(expression)
{
    this.expression = expression;
    this.contents = [];

    this.insert = function(evaluator)
    {
        this.contents.push(evaluator);
    }

    this.execute = function(execContext)
    {
        var fileName = evalExpr(execContext, this.expression);

        var result = "";
        for (var i in this.contents)
        {
            result += this.contents[i].execute(execContext);
        }
        writeStringToFile(fileName, result);
        return result;
    }
}

module.exports = { File: File }