const asyncStep = async (name, stepFunction, args) => {
  try {
    console.log(`Start step`);
    const functionResult = await stepFunction(...args);
    console.log(`Start end`);
    return functionResult;
  } catch (e) {
    console.log(`Start end`);
    throw e;
  }
};

const syncStep = (name, stepFunction, args) => {
  try {
    console.log(`Start step`);
    const functionResult = stepFunction(...args);
    console.log(`Start end`);
    return functionResult;
  } catch (e) {
    console.log(`Start end`);
    throw e;
  }
};

const stepDecorator = (classFunction, functionList) => {
  for (const functionName of functionList) {
    const originalFunction = classFunction.prototype[functionName];
    if (originalFunction.then || originalFunction.constructor.name === 'AsyncFunction') {
      classFunction.prototype[functionName] = async function (...args) {
        return asyncStep(functionName, originalFunction, args);
      };
    } else {
      classFunction.prototype[functionName] = function (...args) {
        return syncStep(functionName, originalFunction, args);
      };
    }
  }
};

class ShouldBeDecorated {
  constructor() {
  }

  async asyncCaller() {
    return new Promise((res) => res(true))
  }

  syncCaller(args, dfd) {
    console.log('args');
    console.log(args, dfd);
    return args
  }
}

stepDecorator(ShouldBeDecorated, ['asyncCaller', 'syncCaller'])
console.log(ShouldBeDecorated);
const decoratedInstance = new ShouldBeDecorated()
decoratedInstance.syncCaller(111, 32354)