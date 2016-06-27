import { EventEmitter } from 'events';
import { UserConstant } from 'constants/user';
import { UserDispatcher } from 'dispatchers/user';

export default class UserStoreClass extends EventEmitter {
  constructor() {
    super();
    this.user = null;

    this.dispatchIndex = UserDispatcher.register((payload) => {
      let action = payload.action;
      switch (action.type) {
        case UserConstant.CURRENT_USER:
        case UserConstant.USER_LOGIN_SUCCESS:
          this.saveUser(action.data);
          break;
        case UserConstant.USER_NOT_FOUND:
        case UserConstant.USER_LOGIN_ERROR:
        case UserConstant.USER_LOGOUT_SUCCESS:
          this.saveUser(null);
          break;
      }

      this.emit('USER_CHANGED');
      return true;
    });
  }

  addChangedListener(callback) {
    this.addListener('USER_CHANGED', callback);
  }

  removeChangedListener(callback) {
    this.removeListener('USER_CHANGED', callback);
  }

  getUser() {
    return this.user;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  saveUser(user) {
    if (user) {
      this.user = user;
      localStorage.setItem('token', this.user.token);
    } else {
      this.user = null;
      localStorage.removeItem('token');
    }
  }

  isLogin() {
    return !!localStorage.getItem('token');
  }
}

export const UserStore = new UserStoreClass();
