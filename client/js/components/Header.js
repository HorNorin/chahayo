import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import SessionStore from 'stores/SessionStore';
import FlashActions from 'actions/FlashActions';
import SessionActions from 'actions/SessionActions';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.onSessionChanged = this.onSessionChanged.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    var email = this.refs.txtEmail.value;
    var password = this.refs.txtPassword.value;

    SessionActions.login({email: email, password: password});
  }

  onSessionChanged() {
    if (!SessionStore.token()) {
      browserHistory.push({
        pathname: '/login',
        state: { email: this.refs.txtEmail.value }
      });
    } else {
      FlashActions.success('Successfully logged in.');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isOpen: nextProps.isOpen});
  }

  componentDidMount() {
    SessionStore.addChangeListener(this.onSessionChanged);
  }

  componentWillUnmount() {
    SessionStore.removeChangeListener(this.onSessionChanged);
  }

  toggleDropdown(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({isOpen: !this.state.isOpen});
  }

  _arrowClass(isOpen) {
    return isOpen ? 'open' : 'close';
  }

  _dropdownOpenClass(isOpen) {
    if (isOpen) {
      return 'header-dropdown open';
    } else {
      return 'header-dropdown';
    }
  }

  render() {
    var rightHeader = this.props.user ?
      this.logoutHeader() : this.loginHeader();

    return (
      <nav className="header clearfix">
        <div className="header-wrap clearfix">
          <div className="header-center clearfix">
            <Link className="logo" to="/">Chahayo</Link>
          </div>
          { rightHeader }
        </div>
      </nav>
    );
  }

  loginHeader() {
    return (
      <div className="header-right clearfix">
        <form onSubmit={this.onSubmit} className="form-inline" autoComplete="off">
          <div className="form-group">
            <input type="email" ref="txtEmail" name="email"
              placeholder="Email" autoComplete="off" />
          </div>
          <div className="form-group">
            <input type="password" ref="txtPassword" name="password"
              placeholder="Password" autoComplete="off" />
          </div>
          <button onClick={this.onSubmit} style={{display: 'none'}}></button>
        </form>
      </div>
    );
  }

  logoutHeader() {
    return (
      <div className="header-right">
        <a href="#" className="header-username"
          onClick={this.toggleDropdown}>
          {this.props.user.username}
          <span className={this._arrowClass(this.state.isOpen)}></span>
        </a>
        <ul className={this._dropdownOpenClass(this.state.isOpen)}>
          <div className="caret">
            <span className="caret-outer"></span>
            <span className="caret-inner"></span>
          </div>
          <li className="header-dropdown-item">
            <Link to={`/user/${this.props.user.id}`}>Settings</Link>
          </li>
          <li className="divider"></li>
          <li className="header-dropdown-item">
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    );
  }
}
