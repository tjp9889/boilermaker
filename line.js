
var evalExpr = require('./evaluator.js').evalExpr;

function Line(contents)
{
    this.contents = contents;

    this.insert = function(evaluator) { }

    this.execute = function(execContext)
    {
        function executor(str, p1)
        {
            return evalExpr(execContext, p1);
        }
        return this.contents.replace(/\$\$(.*?)\$\$/g, executor) + '\n';
    }
}

module.exports = { Line: Line }