import { Dispatcher } from 'flux';

export default class UserDispatcherClass extends Dispatcher {
  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
}

export const UserDispatcher = new UserDispatcherClass();
