import { Config } from 'constants/config';
import { BoardConstant } from 'constants/board';
import { AppDispatcher } from 'dispatchers/app';

export default class BoardActionClass {
  getBoards(token) {
    $.ajax({
      url: Config.BOARD_URL,
      method: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': ` Token token=${token}`
      },
      success: (data) => {
        AppDispatcher.handleViewAction({
          data: data.boards,
          type: BoardConstant.GET_SUCCESS
        });
      },
      error: (xhr) => {
        AppDispatcher.handleViewAction({
          data: xhr.responseText,
          type: BoardConstant.GET_ERROR
        });
      }
    })
  }
}

export const BoardAction = new BoardActionClass();
