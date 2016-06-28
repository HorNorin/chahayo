import { EventEmitter } from 'events';
import { BoardConstant } from 'constants/board';
import { AppDispatcher } from 'dispatchers/app';

export default class BoardStoreClass extends EventEmitter {
  constructor() {
    super();

    this.boards = [];
    this.dispatchIndex = AppDispatcher.register((payload) => {
      let action = payload.action;
      switch (action.type) {
        case BoardConstant.GET_SUCCESS:
          this.saveBoards(action.data);
          break;
        case BoardConstant.GET_ERROR:
          this.saveBoards([]);
          break;
      }

      this.emit('BOARD_CHANGE');
      return true;
    });
  }

  getBoards() {
    return this.boards;
  }

  saveBoards(boards) {
    this.boards = boards;
  }

  addChangedListener(callback) {
    this.addListener('BOARD_CHANGE', callback);
  }

  removeChangedListener(callback) {
    this.removeListener('BOARD_CHANGE', callback);
  }
}

export const BoardStore = new BoardStoreClass();
