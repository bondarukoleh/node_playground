// stub
const registerMember = (name) => ({ name });

class Storage {
  constructor() {
    this.storage = {};
  }

  _setInUseStatus(user, status){
    user.inUse = status;
  }

  _isInUse(user){
    return !!user.inUse
  }

  async _createUserByName({name, inUse}) {
    const uniqValue = `${name}_${Date.now().toString()}`;
    let userData = null;
    try {
      userData = await registerMember(uniqValue);
    } catch (e) {
      throw new Error(`User ${name} fail to register. Error: ${e}`)
    }
    this.storage[uniqValue] = userData;
    inUse ? this._setInUseStatus(this.storage[uniqValue], true) :
     this._setInUseStatus(this.storage[uniqValue], false);
    return this.storage[uniqValue];
  }

  async getUserByName(name) {
    for (const userID of Object.keys(this.storage)) {
      if (userID.includes(name)) {
        if (this._isInUse(this.storage[userID])) throw new Error(`User ${userID} in use in another test.`);
        this._setInUseStatus(this.storage[userID], true)
        return this.storage[userID];
      }
    }
    return this._createUserByName({name: name, inUse: true})
  }

  async getAnyUser(){
    for(const [userID, userData] of Object.entries(this.storage)) {
      if(this._isInUse(userData)){
        this._setInUseStatus(this.storage[userID], true)
        return this.storage[userID]
      }
    }
    return this._createUserByName({name: Date.now().toString(), inUse: true})
  }

  releaseUserByName(name) {
    for (const userID of Object.keys(this.storage)) {
      if (userID.includes(name) && this._isInUse(this.storage[userID])) {
        this._setInUseStatus(this.storage[userID], false)
      }
    }
  }

  toString() {
    return this.storage;
  }
}
const initiateStorage = async function () {
  global.userStorage = new Storage();
  global.userStorage._createUserByName({name:'default'})
}

initiateStorage();