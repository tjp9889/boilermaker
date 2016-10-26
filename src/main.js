var template = require('./template.js');

var configData = {
    "show" : true,
    "people" : {
        "Travis" : {
            "relatives" : [
                "Nat",
                "Bee"
            ]
        },
        "Randy" : {
            "relatives" : [
                "Kim",
                "Lexi"
            ]
        },
    }
};
var rootBlock = new template.Root({});
var showBlock = new template.Condition("show");
var personBlock = new template.Repeat("people");
var personFile = new template.File("'people/' + _key + '.txt'");
var personLine = new template.Line("Hello $$_key$$!");
var relationBlock = new template.Repeat("relatives");
var relationLine = new template.Line("You are related to $$_value$$.");

rootBlock.insert(showBlock);
showBlock.insert(personBlock);
personBlock.insert(personFile);
personFile.insert(personLine);
personFile.insert(relationBlock);
relationBlock.insert(relationLine);

rootBlock.execute(configData);
