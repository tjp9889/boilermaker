var vm = require('vm');

function evalExpr(globals, line)
{
    var script = new vm.Script(line);
    var context = new vm.createContext(globals);
    return script.runInContext(context);
}

module.exports = {
    evalExpr: evalExpr
}