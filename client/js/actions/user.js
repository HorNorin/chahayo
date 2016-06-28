import { Config } from 'constants/config';
import { UserConstant } from 'constants/user';
import { AppDispatcher } from 'dispatchers/app';

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
        AppDispatcher.handleViewAction({
          data: data.user,
          type: UserConstant.CURRENT_USER
        });
      },
      error: (xhr) => {
        AppDispatcher.handleViewAction({
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
        AppDispatcher.handleViewAction({
          data: data.user,
          type: UserConstant.USER_LOGIN_SUCCESS
        });
      },
      error: (xhr) => {
        AppDispatcher.handleViewAction({
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
        AppDispatcher.handleViewAction({
          data: data,
          type: UserConstant.USER_LOGOUT_SUCCESS
        });
      },
      error: (xhr) => {
        let type = xhr.status === 200 ?
          UserConstant.USER_LOGOUT_SUCCESS : UserConstant.USER_LOGOUT_ERROR;

        AppDispatcher.handleViewAction({
          type: type,
          data: xhr.responseText
        });
      }
    });
  }

  register(user) {
    $.ajax({
      url: Config.REGISTER_URL,
      type: 'POST',
      dataType: 'json',
      data: { user: user },
      success: function(data) {
        AppDispatcher.handleViewAction({
          data: data.user,
          type: UserConstant.REGISTER_SUCCESS
        });
      },
      error: function(error) {
        AppDispatcher.handleViewAction({
          data: error.responseJSON,
          type: UserConstant.REGISTER_ERROR
        });
      }
    });
  }
}

export const UserAction = new UserActionClass();
