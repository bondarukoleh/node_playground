const asyncStep = async (name, stepFunction, args) => {
  try {
    let result = await stepFunction(...args)
    console.log('allure step end success')
    console.log(`Log success function "${name}" with arguments: ${args}.`)
    return result;
  } catch(error) {
    console.log('allure step end failed')
    console.log(`Log failed function "${name}" with arguments: ${args}.`)
    throw error
  }
};

const syncStep = (name, stepFunction, args) => {
  try {
    let result = stepFunction(...args)
    console.log('allure step end success')
    console.log(`Log success function ${name} and arguments: ${args}.`)
    return result;
  } catch(error) {
    console.log('allure step end failed')
    console.log(`Log failed function ${name} and arguments: ${args}.`)
    throw error
  }
};

const stepDecorator = (contextToDecorate, functionList) => {
  for (const functionName of functionList) {
    const originalFunction = contextToDecorate[functionName].bind(contextToDecorate);
    if (originalFunction.then || originalFunction.constructor.name === 'AsyncFunction') {
      contextToDecorate[functionName] = async function (...args) {
        return asyncStep(functionName, originalFunction, args);
      };
    } else {
      contextToDecorate[functionName] = function (...args) {
        return syncStep(functionName, originalFunction, args);
      };
    }
  }
};

class ShouldBeDecorated {
  constructor() {
    stepDecorator(this, ['asyncCall', 'syncCall'])
    this.instanseValue = 'some instanse value'
  }

  async asyncCall(...args) {
    console.log(`Hello from asyncCall, got args ${args}`);
    console.log(`instanse value - ${this.instanseValue}`);
    return new Promise((res) => res(args))
  }

  syncCall(arg1, arg2) {
    console.log(`Hello from syncCall, got args ${arguments[0]} ${arguments[1]}`);
    console.log(`instanse value - ${this.instanseValue}`);
    return arguments
  }
}

const decoratedInstanse = new ShouldBeDecorated()
decoratedInstanse.asyncCall('asyncArg1', 'asyncArg2').then(console.log)
console.log(decoratedInstanse.syncCall('syncArg1', 'syncArg2'))