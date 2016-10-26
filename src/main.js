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

var showBlock = new template.Condition("root.show");
var personBlock = new template.Repeat("root.people");
var personFile = new template.File("'people/' + key + '.txt'");
var personLine = new template.Line("Hello $$key$$!");
var relationBlock = new template.Repeat("value.relatives");
var relationLine = new template.Line("You are related to $$value$$.");

showBlock.insert(personBlock);
personBlock.insert(personFile);
personFile.insert(personLine);
personFile.insert(relationBlock);
relationBlock.insert(relationLine);

console.log(showBlock.execute({root: configData, outer: null, this: configData}));
