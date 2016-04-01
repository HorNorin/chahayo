import { browserHistory } from 'react-router';
import SessionStore from 'stores/SessionStore';
import FlashActions from 'actions/FlashActions';
import SessionActions from 'actions/SessionActions'

export default class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.onSessionChanged = this.onSessionChanged.bind(this);
  }

  onSessionChanged() {
    FlashActions.success('Successfully logged out.');
    browserHistory.push('/');
  }

  componentDidMount() {
    SessionActions.logout(SessionStore.token());
    SessionStore.addChangeListener(this.onSessionChanged);
  }

  componentWillUnmount() {
    SessionStore.removeChangeListener(this.onSessionChanged);
  }

  render() {
    return (
      <div className="logout">
        Redirecting back. Please wait a moment...
      </div>
    );
  }
}
