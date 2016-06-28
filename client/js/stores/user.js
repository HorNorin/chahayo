import { EventEmitter } from 'events';
import { UserConstant } from 'constants/user';
import { AppDispatcher } from 'dispatchers/app';

export default class UserStoreClass extends EventEmitter {
  constructor() {
    super();
    this.user = null;
    this.loginError = '';
    this.validationErrors = [];

    this.dispatchIndex = AppDispatcher.register((payload) => {
      let action = payload.action;
      switch (action.type) {
        case UserConstant.CURRENT_USER:
        case UserConstant.USER_LOGIN_SUCCESS:
        case UserConstant.REGISTER_SUCCESS:
          this.saveUser(action.data);
          this.clearErrors();
          break;
        case UserConstant.USER_LOGIN_ERROR:
          this.saveUser(null);
          this.setLoginError('Invalid email or password');
        case UserConstant.USER_NOT_FOUND:
        case UserConstant.USER_LOGOUT_SUCCESS:
          this.saveUser(null);
          break;
        case UserConstant.REGISTER_ERROR:
          this.saveUser(null);
          this.setValidationErrors(action.data);
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

  getLoginError() {
    return this.loginError;
  }

  getValidationErrors() {
    return this.validationErrors;
  }

  saveUser(user) {
    if (user) {
      this.user = user;
      localStorage.setItem('token', this.user.token);
    } else {
      this.user = null;
      localStorage.removeItem('token');
    }
    this.validationErrors = [];
  }

  setLoginError(message) {
    this.loginError = message;
  }

  setValidationErrors(messages) {
    this.validationErrors = messages.users;
  }

  clearErrors() {
    this.loginError = '';
    this.validationErrors = [];
  }

  isLogin() {
    return !!localStorage.getItem('token');
  }
}

export const UserStore = new UserStoreClass();
