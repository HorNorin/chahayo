import { UserStore } from 'stores/user';
import { UserAction } from 'actions/user';

export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validationErrors: []
    };

    this.doLogin = this.doLogin.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.onUserChanged = this.onUserChanged.bind(this);
    UserStore.addChangedListener(this.onUserChanged);

    document.title = 'Chahayo - Let your ideas be known';
  }

  /** Begin lifecycle hooks **/

  componentDidMount() {
    this.refs.txtEmail.focus();
  }

  componentDidUpdate() {
    this.refs.txtEmail.focus();
  }

  /** End lifecycle hooks **/

  doLogin(event) {
    event.preventDefault();

    let email = this.refs.txtEmail.value;
    let password = this.refs.txtPassword.value;

    if (email && password) {
      UserAction.login({ email: email, password: password });
    }
  }

  doRegister(event) {
    event.preventDefault();
    UserAction.register({
      email: this.refs.txtUserEmail.value,
      username: this.refs.txtUserUsername.value,
      password: this.refs.txtUserPassword.value,
      password_confirmation: this.refs.txtUserPasswordConfirm.value
    });
  }

  onUserChanged() {
    let loginError = UserStore.getLoginError();
    let validationErrors = UserStore.getValidationErrors();

    if (loginError) this.refs.txtPassword.value = '';
    if (validationErrors.length > 0) {
      this.refs.txtUserPassword.value = '';
      this.refs.txtUserPasswordConfirm.value = '';
    }

    this.setState({
      loginError: UserStore.getLoginError(),
      validationErrors: UserStore.getValidationErrors()
    });
  }

  render() {
    if (this.props.data.isLogin) {
      return this.loginedContent();
    } else {
      return this.notLoginedContent();
    }
  }

  /** Helper methods **/

  loginedContent() {
    return (
      <div className="content home">
        <h1>Home Page</h1>
      </div>
    );
  }

  notLoginedContent() {
    return (
      <div className="home">
        { this.getLoginErrorNode() }

        <form className="form" onSubmit={ this.doLogin }>
          <div className="form-group">
            <input type="email" name="email" ref="txtEmail" placeholder="Email" />
          </div>
          <div className="form-group password">
            <input type="password" name="password" ref="txtPassword" placeholder="Password" />
          </div>
          <div className="form-group submit">
            <button onClick={ this.doLogin }>Login</button>
          </div>
        </form>

        { this.getValidationErrorNodes() }

        <form className="form" onSubmit={ this.doRegister }>
          <div className="form-group">
            <input type="text" name="username" ref="txtUserUsername" placeholder="Username" />
          </div>
          <div className="form-group">
            <input type="email" name="email" ref="txtUserEmail" placeholder="Email" />
          </div>
          <div className="form-group">
            <input type="password" name="password" ref="txtUserPassword" placeholder="Password" />
          </div>
          <div className="form-group password">
            <input type="password" name="password_confirmation" ref="txtUserPasswordConfirm" placeholder="Password Confirmation" />
          </div>
          <div className="form-group submit">
            <button onClick={ this.doRegister }>Register</button>
          </div>
        </form>
      </div>
    );
  }

  getLoginErrorNode() {
    if (this.state.loginError) {
      return (
        <ul className="validation-errors">
          <li>{ this.state.loginError }</li>
        </ul>
      );
    } else {
      return null;
    }
  }

  getValidationErrorNodes() {
    if (this.state.validationErrors.length > 0) {
      let messageNodes = this.state.validationErrors.map((message, index) => {
        return (<li key={ index }>{ message }</li>);
      });
      return (<ul className="validation-errors">{ messageNodes }</ul>);
    } else {
      return null;
    }
  }
}
