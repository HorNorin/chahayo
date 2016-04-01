import { EventEmitter } from 'events';
import SessionStore from 'stores/SessionStore';
import AppDispatcher from 'dispatchers/AppDispatcher';
import FlashConstants from 'constants/FlashConstants';

var _message = null;
const CHANGE_EVENT = 'flash_change';

class FlashStoreClass extends EventEmitter {
  constructor() {
    super();

    this.dispatcherIndex = AppDispatcher.register((payload) => {
      var action = payload.action;

      switch (action.actionType) {
        case FlashConstants.FLASH_ADDED:
          _message = action.data;
          this.emitChange();
          break;
      }

      return true;
    });
  }

  message() {
    var message = _message;
    _message = null;
    return message;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

const FlashStore = new FlashStoreClass();

export default FlashStore;
