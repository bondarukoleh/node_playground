const path = require('path');
const { walkSync } = require('./helpers.js');
const { buildScope } = require('./buildScope');

const {
    RUN_BROWSER1 = 'chrome',
    RUN_SUITS1 = 'tests',
    GREP_TEST1,
    FINALREVIEW1,
    LOCAL_RUN1,
    DEBUG_PROCESS1,
    TREADS_COUNT1
} = process.env;

const browsersMap = {
    chrome: ['chrome'],
    firefox: ['firefox'],
    modern: ['chrome', 'firefox']
};

const pathesOfSpecs = {
  tests : walkSync(path.resolve(process.cwd(), './__retrySpecs/'))
};
// [ '/Users/olehbondaruk/work/home.spec.ts',
//     '/Users/olehbondaruk/work/home_second.spec.ts' ]

const formCommand = (browser, filePath) => {
    return `RUN_BROWSER=${browser} BROWSERS=${RUN_BROWSER} ./node_modules/.bin/protractor  ./protractor.conf.js  --specs ${filePath}`
};

function filesToCommand(files) {
    const requiredBrowsers = browsersMap[RUN_BROWSER];

    return requiredBrowsers.map((browser) => {
        return files.map((file) => formCommand(browser, file))
    }).reduce((acc, formedCommands) => {
            acc.push(...formedCommands);

            return acc
        }, [])
}
// [ 'RUN_BROWSER1=chrome BROWSERS1=modern ./node_modules/.bin/protractor  ./protractor.conf.js  --specs /Users/olehbondaruk/work/home.page.spec.ts',
//     'RUN_BROWSER1=chrome BROWSERS1=modern ./node_modules/.bin/protractor  ./protractor.conf.js  --specs /Users/olehbondaruk/work/home.page_second.spec.ts',
//     'RUN_BROWSER1=firefox BROWSERS1=modern ./node_modules/.bin/protractor  ./protractor.conf.js  --specs /Users/olehbondaruk/work/home.page.spec.ts',
//     'RUN_BROWSER1=firefox BROWSERS1=modern ./node_modules/.bin/protractor  ./protractor.conf.js  --specs /Users/olehbondaruk/work/home.page_second.spec.ts' ]

const reformatCommand = (cmd, stack) => {
  console.log('FROM reformatCommand');
  console.log(`${cmd}`);
  console.log(`STACK`);
  console.log(stack);
  const regexp = /(?<=SPECTITLE:\[)(\d|\w|\s)+/ig;
  const failedSpecs = stack.match(regexp);
  if(failedSpecs) {
    const failedNotByAssertion = failedSpecs.filter((spec) => !spec.includes('AssertionError'));
    if(failedNotByAssertion.length) {
      return `${cmd} --mochaOpts.grep='${failedNotByAssertion.join('|')}'`
    } else {
      return null
    }
  }

  console.log(failedSpecs)
};


function getRuns() {
    // return (GREP_TEST) ? filesToCommand(grepSpecs(grep)) : filesToCommand(pathesOfSpecs[RUN_SUITS])
    return filesToCommand(pathesOfSpecs[RUN_SUITS1]);
} // returns array of ready commands

const cycleCB = () => true;
const failedNotByAssert = (stack) => !stack.includes('ASSERTION ERROR');

Array.prototype.shuffle = function() {
  const input = this;
  for(let i = input.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const itemAtIndex = input[randomIndex];
    input[randomIndex] = input[i];
    input[i] = itemAtIndex
  }
  return input
};

async function execRun() {
  const arrayCommandsToExecute = getRuns();
  const reRunner = buildScope({
    everyCycleCallback: cycleCB,
    longestTestTime: 600 * 1000,
    // formCommanWithOption: getRoutCommand,

    maxSessionCount: 18,
    specRerunCount: 2,
    stackAnalize: failedNotByAssert,
    debugProcess: true
  });
  const run = await reRunner(arrayCommandsToExecute);
  if(run.length) {
    process.exit(1)
  } else {
    process.exit(0)
  }
}

execRun();
