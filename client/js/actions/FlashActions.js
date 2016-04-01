import AppDispatcher from 'dispatchers/AppDispatcher';
import FlashConstants from 'constants/FlashConstants';

function setMessage(type, message) {
  var timeout = setTimeout(() => {
    AppDispatcher.handleViewAction({
      actionType: FlashConstants.FLASH_ADDED,
      data: {
        type: type,
        text: message
      }
    });

    clearTimeout(timeout);
  }, 0);
}

const FlashActions = {
  success(message) {
    setMessage('success', message);
  },

  info(message) {
    setMessage('info', message);
  },

  warning(message) {
    setMessage('warning', message);
  },

  error(message) {
    setMessage('error', message);
  }
}

export default FlashActions;
