require('./userSorage');

async function check() {
  const user1 = await global.userStorage.getUserByName('first');
  console.log(`ASKED for first, got:`, user1);
  global.userStorage.releaseUserByName('first')
  console.log('USER RELEASED');
  const user2 = await global.userStorage.getUserByName('first');
  console.log(`ASKED for first second time, got:`, user2);
  console.log(global.userStorage.toString());
  const any = await global.userStorage.getAnyUser();
  console.log('any');
  console.log(any);
  console.log(global.userStorage.toString());
}

check()