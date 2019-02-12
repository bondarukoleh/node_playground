require('./userSorage');

async function checkUserStorage() {
  const user1 = await global.userStorage.getUserByName('testingUser');
  console.log(`ASKED for testingUser, got:`, user1);
  global.userStorage.releaseUserByName('testingUser');
  console.log('USER RELEASED');
  const user2 = await global.userStorage.getUserByName('testingUser');
  console.log(`ASKED for testingUser second time, got:`, user2);
  global.userStorage.releaseUserByName('testingUser');
  console.log('USER RELEASED');
  const any1 = await global.userStorage.getAnyUser();
  console.log('any1');
  console.log(any1);
  const any2 = await global.userStorage.getAnyUser();
  console.log('any2');
  console.log(any2);
  const any3 = await global.userStorage.getAnyUser();
  console.log('any3');
  console.log(any3);
  console.log(global.userStorage.toString());
}

checkUserStorage()