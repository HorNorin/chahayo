import Loading from 'components/Loading';
import FormGroup from 'components/FormGroup';
import { browserHistory } from 'react-router';
import SessionStore from 'stores/SessionStore';
import FlashStore from 'stores/FlashStore';
import FlashActions from 'actions/FlashActions';
import FlashMessage from 'components/FlashMessage';
import SessionActions from 'actions/SessionActions';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      loading: true,
      isError: false,
      isEnabled: false
    };

    this.doLogin = this.doLogin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onLoaded = this.onLoaded.bind(this);
    this.onFlashChange = this.onFlashChange.bind(this);
    this.onSessionChange = this.onSessionChange.bind(this);
  }

  doLogin(event) {
    event.preventDefault();
    SessionActions.login({
      email: this.refs.txtEmail.value,
      password: this.refs.txtPassword.value
    });
  }

  onLoaded() {
    if (!SessionStore.token()) {
      var isError = false;
      var txtEmail = this.refs.txtEmail;
      var state = this.props.location.state;
      if (!_.isEmpty(state)) {
        txtEmail.value = state.email || '';
        this.props.location.state = null;
        isError = state.from != '/register';
      }

      txtEmail.focus();
      this.setState({isError: isError});
    } else {
      FlashActions.success('Already logged in');
      browserHistory.push('/');
    }
  }

  onChange() {
    var email = this.refs.txtEmail.value;
    var password = this.refs.txtPassword.value;

    this.setState({ isEnabled: email && password });
  }

  onFlashChange() {
    this.setState({ message: FlashStore.message() });
  }

  onSessionChange() {
    if (this.state.loading) {
      this.setState({loading: false});
    } else if (SessionStore.errors()) {
      var txtPassword = this.refs.txtPassword;
      if (txtPassword.value != '') {
        txtPassword.value = '';
        txtPassword.focus();
      }
      this.setState({isError: true});
    } else {
      FlashActions.success('Successfully logged in.');
      browserHistory.push('/');
    }
  }

  componentDidMount() {
    SessionActions.user(SessionStore.token());
    FlashStore.addChangeListener(this.onFlashChange);
    SessionStore.addChangeListener(this.onSessionChange);
  }

  componentWillUnmount() {
    FlashStore.removeChangeListener(this.onFlashChange);
    SessionStore.removeChangeListener(this.onSessionChange);
  }

  render() {
    return (
      <Loading loading={this.state.loading}
        onLoaded={this.onLoaded}>
        <FlashMessage message={this.state.message} />
        <div className="login form-area">
          <h1 className="center">Member Login</h1>
          {this._errorComponent()}
          <form className="form" onSubmit={this.doLogin}>
            <FormGroup activeClass="active">
              <input type="email" name="email" ref="txtEmail"
                onChange={this.onChange} />
              <label htmlFor="email">Email</label>
            </FormGroup>
            <FormGroup activeClass="active">
              <input type="password" name="password" ref="txtPassword"
                onChange={this.onChange} />
              <label htmlFor="password">Password</label>
            </FormGroup>
            <div className="form-group">
              <button className={`btn${this.state.isEnabled ? '' : ' disabled'}`}
                onClick={this.doLogin}
                disabled={!this.state.isEnabled}>Login</button>
            </div>
          </form>
        </div>
      </Loading>
    );
  }

  _errorComponent() {
    if (!this.state.isError) return null;

    return (
      <div className="alert alert-danger">
        Invalid email or password
      </div>
    );
  }
}
