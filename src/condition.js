var evalExpr = require('./evaluator.js').evalExpr;

function Condition(expression)
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
        if (exprValue)
        {
            for (var i in this.contents)
            {
                result += this.contents[i].execute(execContext);
            }
        }
        return result;
    }
}

module.exports = { Condition: Condition }