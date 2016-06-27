import { UserAction } from 'actions/user';

export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };

    this.doLogin = this.doLogin.bind(this);
  }

  doLogin(event) {
    event.preventDefault();

    let email = this.refs.txtEmail.value;
    let password = this.refs.txtPassword.value;

    if (email && password) {
      UserAction.login({ email: email, password: password });
    }
  }

  render() {
    if (this.props.data.isLogin) {
      return this.loginedContent();
    } else {
      return this.notLoginedContent();
    }
  }

  loginedContent() {
    return (<h1>Home Page</h1>);
  }

  notLoginedContent() {
    return (
      <div className="home">
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
      </div>
    );
  }
}
