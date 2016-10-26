
var process = require('process');
var Template = require('./template.js').Template;

if ((process.argv.length == 5) && (process.argv[2] == "transform"))
{
    var boilerFile = process.argv[3];
    var configFile = process.argv[4];
    var t = new Template(boilerFile);
    t.executeWithFile(configFile);
}
else
{
    console.log("The only supported command is 'node main.js transform test.boiler test.config'");
}