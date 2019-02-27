class ShouldBeDecorated {
  constructor() {
    decorate(this, ['asyncCall', 'syncCall'])
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

function decorate(contextToDecorate, functionsTodecorate) {
  for(const functionName of functionsTodecorate) {
    const originalFunction = contextToDecorate[functionName]
    const returnStringType = (arg) => Object.prototype.toString.call(arg)
    if(originalFunction.then || returnStringType(originalFunction) === '[object AsyncFunction]') {
      contextToDecorate[functionName] = async function(...args) {
        console.log('allure step start')
        let result = null;
        try {
          result = await originalFunction.call(that, ...args)
          console.log('allure step end success')
          console.log(`Log success function "${functionName}" with arguments: ${args}.`)
          return result
        } catch(error) {
          console.log('allure step end failed')
          console.log(`Log failed function "${functionName}" with arguments: ${args}.`)
          throw error
        }
      }
    } else {
      contextToDecorate[functionName] = function(...args) {
        console.log('allure step start')
        let result = null;
        try {
          result = originalFunction.call(that, ...args)
          console.log('allure step end success')
          console.log(`Log success function ${functionName} and arguments: ${args}.`)
          return result
        } catch(error) {
          console.log('allure step end failed')
          console.log(`Log failed function ${functionName} and arguments: ${args}.`)
          throw error
        }
      }
    }
  }
}
const decoratedInstanse = new ShouldBeDecorated()
decoratedInstanse.asyncCall('asyncArg1', 'asyncArg2').then(console.log)
console.log(decoratedInstanse.syncCall('syncArg1', 'syncArg2'))
