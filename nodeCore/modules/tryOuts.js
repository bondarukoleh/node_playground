const exp = require("./module2");
const exp2 = require("./module2");

function printStuff() {
  const exp = require('./module2');
  const expPath = require.resolve('./module2');
  const expFromCache = require.cache[expPath];

  console.dir({exp, expPath, expFromCache})
}

function loadNewModule() {
  const exp = require('./module2');
  const expSame = require('./module2');
  const expPath = require.resolve('./module2');

  console.assert(exp === expSame, 'Modules instances are different, should be equal')

  delete require.cache[expPath]
  const exp2 = require('./module2');

  console.assert(exp !== exp2, 'Modules instances are equal, should be different')
}
loadNewModule()



