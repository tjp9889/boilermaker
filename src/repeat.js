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
                var repeatContext = {};
                Object.assign(repeatContext, exprValue[k], { _outer: execContext, _global: execContext._global, _key: k, _value: exprValue[k]}, execContext._global);
                result += this.contents[i].execute(repeatContext);
            }
        }

        return result;
    }
}

module.exports = { Repeat: Repeat }