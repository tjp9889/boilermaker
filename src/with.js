var evalExpr = require('./evaluator.js').evalExpr;

function With(expression)
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

        var withContext = {root: execContext.root, outer: execContext};

        var result = "";
        for (var i in this.contents)
        {
            result += this.contents[i].execute(withContext);
        }
        return result;
    }
}

module.exports = { With: With }