require('./userSorage');

async function check() {
  const user1 = await global.userStorage.getUserByName('testingUser123');
  console.log(`ASKED for testingUser123, got:`, user1);
  global.userStorage.releaseUserByName('testingUser123');
  console.log('USER RELEASED');
  const user2 = await global.userStorage.getUserByName('testingUser123');
  console.log(`ASKED for testingUser123 second time, got:`, user2);
  global.userStorage.releaseUserByName('testingUser123');
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

check()