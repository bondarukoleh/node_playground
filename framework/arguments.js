const fs = require('fs');
const argsParser = require('minimist');
const args = process.argv.slice(2);
const ENV_ARGS = argsParser(args);
delete ENV_ARGS._;

const help = _ => console.log('Please provide argument "-r" and path to file you want to read');
const checkFile = filePath => {
    let stat = null;
    try {
        stat = fs.lstatSync(filePath)
    } catch (e) {
        console.error('Valid path to file should be provided. Use "-h" argument to see help');
        console.error(`Error occurred: ${e.message}`);
        process.exit(1)
    }
    if (!stat.isFile()) {
        console.error('File should be provided. Use "-h" argument to see help');
        process.exit(1)
    }
};

const readFile = (filePath) => {
    checkFile(filePath);
    console.log(`Reading: ${filePath}`);
    fs.createReadStream(filePath).pipe(process.stdout);
};

const argumentsMap = {
    r: readFile,
    h: help
};

if (args.length) {
    for (const arg of Object.keys(ENV_ARGS)) {
        console.log(arg);
        argumentsMap[arg](ENV_ARGS[arg]);
    }
}

/*minimist => $ node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
{ _: [ 'foo', 'bar', 'baz' ],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  beep: 'boop' } */
