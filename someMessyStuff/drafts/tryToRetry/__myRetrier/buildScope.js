const {exec} = require('child_process');
const {sleep, getPollTime} = require('./helpers');

function buildScope(opts) {
  console.log('GOT OPTIONS');
  console.log(opts);
  const {
    specRerunCount = 2,
    stackAnalize = (stack) => true,
    everyCycleCallback = async () => true,
    reformatCommand = undefined,
    grepWord = '',
    longestTestTime = 450000,
    debugProcess = false,
    intervalPoll = getPollTime(2000),
  } = opts;
  let {maxSessionCount = 18} = opts;
  const failedByAssert = [];
  let currentSessionCount = 0;

  const runPromise = (cmd) => new Promise((resolve) => {
    let cmdCB = null;
    let fullStack = '';

    const now = +Date.now();
    const proc = exec(cmd);
    const watcher = setInterval(
      () => {
        if (+Date.now() - now > longestTestTime) {
          clearInterval(watcher);
          proc.kill();
          resolve(cmd)
        }
      }, 15000);

    proc.on('exit', () => {
      console.log('CLEARING INTERVAL');
      clearInterval(watcher)
    });
    proc.stdout.on('data', (data) => {
      console.log(data.toString('utf8'));
      (debugProcess) && console.log(data.toString('utf8')); fullStack += data.toString()
    });
    proc.stderr.on('data', (data) => console.log(data.toString('utf8')));
    proc.on('error', (e) => {
      console.log(`ERROR!!!!`);
      console.error(e)
    });
    proc.on('close', (code) => {
      console.log(`CLOSING PROCESS`);
      console.log(fullStack, code);
      if(debugProcess) {console.log(fullStack, code)}
      let execResult = null;
      // stackAnalize - assert function
      if(code !== 0 && stackAnalize(fullStack)) {
        console.log(`FAILED NOT BY ASSERT`);
        console.log(cmd);
        console.log(`cmd`);
        console.log('fullStack');
        console.log(fullStack);
        execResult = cmd
      } else {
        // if code 0 - success, if not 0 failed
        if(code !== 0) {
          console.log(`FAILED BY ASSERT!!`);
          failedByAssert.push(cmd);
          console.log(failedByAssert);
          console.log(`THIS WAS ARRAY`);
        }
      }
      if(cmdCB) {
        console.log('here in cmd CB');
        cmdCB()
      }
      // if(reformatCommand && execResult) {
      //   console.log(`IN REFORMAT COMMAND`);
      //   execResult = reformatCommand(execResult, fullStack);
        console.log(`AAAAAA -`, execResult);
      // }
      resolve(execResult)
    })
  });

  async function execRun(arrayOfCommands) {
    const runArr = arrayOfCommands.filter(function (cmd) {
      return cmd.includes(grepWord)
    });
    const failedTests = await new Array(specRerunCount).fill(specRerunCount).reduce((resolver) => {// TODO: change to map
      return resolver.then((resolvedArr) => performTestRun(resolvedArr, []).then((failedArr) => failedArr))
    }, Promise.resolve(runArr));

    async function runCommandsArray(commandsArray, failedTestsArray) {
      if (maxSessionCount > currentSessionCount && commandsArray.length) {
        currentSessionCount += 1;
        const result = await runPromise(commandsArray.splice(0, 1)[0]).catch(console.error);
        if (result) {
          failedTestsArray.push(result)
        }
        currentSessionCount -= 1
      }
    }

    async function performTestRun(commandsArray, failedTestsArray) {
      const runCommandIntervalID = setInterval(() => runCommandsArray(commandsArray, failedTestsArray), intervalPoll);
      console.log(`FROM performTestRun`);
      console.log(commandsArray);
      console.log(failedTestsArray);
      console.log(`ALL`);
      do {
        if (commandsArray.length) {
          await runCommandsArray(commandsArray, failedTestsArray)
        }
        if (currentSessionCount) {
          await sleep(2000)
        }
      } while (commandsArray.length || currentSessionCount);

      if (everyCycleCallback && typeof everyCycleCallback === 'function') {
        try {
          await everyCycleCallback()
        } catch (e) {
          console.log(e)
        }
      }

      clearInterval(runCommandIntervalID);
      return failedTestsArray;
    }

    console.log(failedTests.length, 'Failed test count');
    console.log([...failedTests, ...failedByAssert]);
    return [...failedTests, ...failedByAssert]
  }
  return execRun;
}

module.exports = {buildScope};
