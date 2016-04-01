import Config from 'constants/Config';
import UserConstants from 'constants/UserConstants';
import AppDispatcher from 'dispatchers/AppDispatcher';

const UserActions = {
  register(userParams) {
    $.ajax({
      url: Config.REGISTER,
      type: 'POST',
      dataType: 'json',
      data: userParams,
      success: function(data) {
        AppDispatcher.handleViewAction({
          actionType: UserConstants.REGISTER_SUCCESS,
          data: data
        });
      },
      error: function(error) {
        AppDispatcher.handleViewAction({
          actionType: UserConstants.REGISTER_FAILED,
          data: error.responseJSON
        });
      }
    });
  }
}

export default UserActions;
