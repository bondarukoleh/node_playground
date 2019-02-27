class ShouldBeDecorated {
  constructor() {
  }

  async asyncCaller() {
    return new Promise((res) => res(true))
  }

  syncCaller(...args) {
    return args
  }
}

function decorate(classItem, functions) {

  for(const fun of functions) {
    const originalFn = classItem.prototype[fun]
    const returnStringType = (arg) => Object.prototype.toString.call(arg)
    if(originalFn.then || returnStringType(originalFn) === '[object AsyncFunction]') {
      classItem.prototype[fun] = async function(...args) {
        // allure step start
        console.log('HERE')
        let result
        try {
          result = await originalFn(...args)
          // allure step end success
          console.log('HERE1')
          return result
        } catch(error) {
          // allure step end failed
          throw error
        }
      }
    } else {
      classItem.prototype[fun] = function(...args) {
        // allure step start
        let result
        try {
          console.log('HERE')
          result = originalFn(...args)
          // allure step end success
          return result
        } catch(error) {
          console.log('HERE1')
          // allure step end failed
          throw error
        }
      }
    }
  }
}
decorate(ShouldBeDecorated, ['asyncCaller', 'syncCaller'])

const cl = new ShouldBeDecorated()

console.log(cl.syncCaller('dsada'))