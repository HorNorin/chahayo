import { EventEmitter } from 'events';
import UserConstants from 'constants/UserConstants';
import AppDispatcher from 'dispatchers/AppDispatcher';

var _user = null;
var _errors = null;
const CHANGE_EVENT = 'user_change';

export default class UserStoreClass extends EventEmitter {
  constructor() {
    super();

    this.dispatcherIndex = AppDispatcher.register((payload) => {
      var action = payload.action;

      switch (action.actionType) {
        case UserConstants.REGISTER_SUCCESS:
          _user = action.data.user;
          _errors = null;
          this.emitChange();
          break;

        case UserConstants.REGISTER_FAILED:
          _user = null;
          _errors = action.data;
          this.emitChange();
          break;
      }
    })
  }

  errors() {
    return _errors;
  }

  registeredUser() {
    return _user;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

const UserStore = new UserStoreClass();

export default UserStore;
