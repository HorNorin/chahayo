import { Dispatcher } from 'flux';

export default class AppDispatcherClass extends Dispatcher {
  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
}

export const AppDispatcher = new AppDispatcherClass();
