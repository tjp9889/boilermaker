
var fs = require('fs');
var readline = require('readline');

function test()
{
  var rl = readline.createInterface({
    input: fs.createReadStream('package.json')
  });

  rl.on('line', (line) => {
    console.log('Line from file:', line);
  });
}

function linePrint (line)
{
  console.log(JSON.stringify(line, null, ' '));
}

parseLine(0, "/* $$$ if (a.go)   $$$ */", linePrint);
parseLine(1, "Hello friend $$friend$$", linePrint);
parseLine(2, "$$$end$$$", linePrint);

function parseLine(lineNumber, line, callback)
{
    var result = {number: lineNumber, type: 'line', param: line};
    var newStr = line.replace(/\$\$\$\s*(end|repeat|if|with|file)\s*(.*?)\s*\$\$\$/g,
    function(str, p1, p2) {
      result.type = p1;
      result.param = p2;
      return "";
    });
    callback(result);
    return result;
}

