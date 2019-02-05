const argsParser = require('minimist');
const envArgs = process.argv.slice(2);
const args = argsParser(envArgs);
const toJson = JSON.stringify;

console.log(`You pass such parameters to executable file: ${toJson(args)}. \n That's all folks.`);