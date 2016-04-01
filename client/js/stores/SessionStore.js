import { EventEmitter } from 'events';
import cookie from 'react-cookie';
import SessionConstants from 'constants/SessionConstants';
import AppDispatcher from 'dispatchers/AppDispatcher';

var _user = null;
var _errors = null;
const CHANGE_EVENT = 'change';
const TOKEN_KEY    = '_chahayo_auth_token';

function _setSession(user) {
  _user = user;
  _errors = null;
  cookie.save(TOKEN_KEY, user.token, { path: '/' });
}

function _resetSession(error) {
  _user = null;
  _errors = error;
  cookie.remove(TOKEN_KEY, { path: '/' });
}

class SessionStoreClass extends EventEmitter {
  constructor() {
    super();

    this.dispatcherIndex = AppDispatcher.register((payload) => {
      var action = payload.action;

      switch (action.actionType) {
        case SessionConstants.USER_SUCCESS:
        case SessionConstants.LOGIN_SUCCESS:
          _setSession(action.data.user);
          this.emitChange();
          break;

        case SessionConstants.USER_FAILED:
        case SessionConstants.LOGIN_FAILED:
        case SessionConstants.LOGOUT_SUCCESS:
          _resetSession(action.data);
          this.emitChange();
          break;

        case SessionConstants.LOGOUT_FAILED:
          this.emitChange();
          break;
      }

      return true;
    });
  }

  user() {
    return _user;
  }

  token() {
    return cookie.load(TOKEN_KEY);
  }

  errors() {
    return _errors;
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

const SessionStore = new SessionStoreClass();

export default SessionStore;
