function Root(globals)
{
    this.globals = globals;
    this.contents = [];

    this.insert = function(evaluator)
    {
        this.contents.push(evaluator);
    }

    this.execute = function(execContext)
    {
        var rootContext = {};
        var globalContext = {};
        Object.assign(globalContext, this.globals, {_root: execContext});
        Object.assign(rootContext, execContext, {_outer: null, _global: globalContext}, globalContext);

        var result = "";
        for (var i in this.contents)
        {
            result += this.contents[i].execute(rootContext);
        }

        return result;
    }
}

module.exports = { Root: Root }