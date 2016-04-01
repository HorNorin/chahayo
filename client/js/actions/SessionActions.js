import Config from 'constants/Config';
import SessionConstants from 'constants/SessionConstants';
import AppDispatcher from 'dispatchers/AppDispatcher';

const SessionActions = {
  login(credential) {
    $.ajax({
      url: Config.LOGIN,
      type: 'POST',
      dataType: 'json',
      data: credential,
      success: function(user) {
        AppDispatcher.handleViewAction({
          actionType: SessionConstants.LOGIN_SUCCESS,
          data: user
        });
      },
      error: function(error) {
        AppDispatcher.handleViewAction({
          actionType: SessionConstants.LOGIN_FAILED,
          data: error
        });
      }
    });
  },

  logout(token) {
    $.ajax({
      url: Config.LOGOUT,
      type: 'GET',
      dataType: 'json',
      headers: { 'Authorization': ` Token token=${token}` },
      success: function(data) {
        AppDispatcher.handleViewAction({
          actionType: SessionConstants.LOGOUT_SUCCESS,
          data: data
        });
      },
      error: function(error) {
        AppDispatcher.handleViewAction({
          actionType: SessionConstants.LOGOUT_FAILED,
          data: error
        });
      }
    })
  },

  user(token) {
    $.ajax({
      url: Config.USER,
      type: 'GET',
      dataType: 'json',
      headers: { 'Authorization': ` Token token=${token}` },
      success: function(user) {
        AppDispatcher.handleViewAction({
          actionType: SessionConstants.USER_SUCCESS,
          data: user
        });
      },
      error: function(error) {
        AppDispatcher.handleViewAction({
          actionType: SessionConstants.USER_FAILED,
          data: error
        });
      }
    });
  }
};

export default SessionActions;
