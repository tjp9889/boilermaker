var fs = require('fs');
var os = require('os');

var scriptContents = fs.readFileSync('bin/boilermaker').toString();
scriptContents = scriptContents.replace(os.EOL, '\n');

try {
    fs.mkdirSync('generated');
} catch (e) {}

fs.writeFileSync('generated/boilermaker', scriptContents);