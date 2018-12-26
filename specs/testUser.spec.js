const {expect} = require('chai')
const {api} = require('../api')

describe('Test User API', () => {
  it('Should return User Details', async () => {
    const user = await api.userDetails.getUserData('2')
    expect(user.data.hasOwnProperty('avatar')).to.eq(true, `${user} should has avatar`)
  })
})