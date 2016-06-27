import { Config } from 'constants/config';
import { UserConstant } from 'constants/user';
import { UserDispatcher } from 'dispatchers/user';

export default class UserActionClass {
  getCurrentUser(token) {
    $.ajax({
      url: Config.USER_URL,
      method: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': ` Token token=${token}`
      },
      success: (data) => {
        UserDispatcher.handleViewAction({
          data: data.user,
          type: UserConstant.CURRENT_USER
        });
      },
      error: (xhr) => {
        UserDispatcher.handleViewAction({
          data: xhr.responseText,
          type: UserConstant.USER_NOT_FOUND
        });
      }
    });
  }

  login(credentials) {
    $.ajax({
      url: Config.LOGIN_URL,
      method: 'POST',
      dataType: 'json',
      data: credentials,
      success: (data) => {
        UserDispatcher.handleViewAction({
          data: data.user,
          type: UserConstant.USER_LOGIN_SUCCESS
        });
      },
      error: (xhr) => {
        UserDispatcher.handleViewAction({
          data: xhr.responseText,
          type: UserConstant.USER_LOGIN_ERROR
        });
      }
    });
  }

  logout(token) {
    $.ajax({
      url: Config.LOGOUT_URL,
      type: 'GET',
      dataType: 'json',
      headers: { 'Authorization': ` Token token=${token}` },
      success: (data) => {
        console.log(data);
        UserDispatcher.handleViewAction({
          data: data,
          type: UserConstant.USER_LOGOUT_SUCCESS
        });
      },
      error: (xhr) => {
        let type = xhr.status === 200 ?
          UserConstant.USER_LOGOUT_SUCCESS : UserConstant.USER_LOGOUT_ERROR;

        UserDispatcher.handleViewAction({
          type: type,
          data: xhr.responseText
        });
      }
    });
  }
}

export const UserAction = new UserActionClass();
