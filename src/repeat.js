var evalExpr = require('./evaluator.js').evalExpr;

function Repeat(expression)
{
    this.expression = expression;
    this.contents = [];

    this.insert = function(evaluator)
    {
        this.contents.push(evaluator);
    }

    this.execute = function(execContext)
    {
        var exprValue = evalExpr(execContext, this.expression);

        var result = "";
        for (var k in exprValue)
        {
            for (var i in this.contents)
            {
                var repeatContext = { root: execContext.root, outer: execContext, key: k, value: exprValue[k] };
                result += this.contents[i].execute(repeatContext);
            }
        }
        return result;
    }
}

module.exports = { Repeat: Repeat }