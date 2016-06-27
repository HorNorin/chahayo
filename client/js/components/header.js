import { UserStore } from 'stores/user';
import { UserAction } from 'actions/user';

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpen: false,
      shouldShowLabel: true
    };

    this.focus = this.focus.bind(this);
    this.toggleFocus = this.toggleFocus.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isDropdownOpen: nextProps.isUserDropdownOpen });
  }

  focus() {
    this.refs.q.focus();
  }

  toggleFocus() {
    this.setState({ shouldShowLabel: !this.state.shouldShowLabel});
  }

  toggleDropdown(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  }

  doLogout(event) {
    event.preventDefault();
    event.stopPropagation();

    UserAction.logout(UserStore.getToken());
  }

  render() {
    if (!this.props.data.isLogin) {
      return (
        <header className="header">
          <div className="header-wrapper">
            <div className="logo center"><a href="/">Chahayo</a></div>
          </div>
        </header>
      )
    }

    let label = this.state.shouldShowLabel ?
      (<label htmlFor="q" ref="label" onClick={ this.focus }>Keyword...</label>) : null;

    return (
      <header className="header">
        <div className="header-wrapper">
          <div className="user">
            <a className="dropdown-switch" href="#" onClick={ this.toggleDropdown }>
              { this.props.data.user.username }
            </a>
            { this.getDropdownContent() }
          </div>
          <div className="search">
            <div className="search-wrapper">
              { label }
              <input type="text" name="q" ref="q" onFocus={ this.toggleFocus } onBlur={ this.toggleFocus } />
            </div>
          </div>
          <div className="logo"><a href="/">Chahayo</a></div>
        </div>
      </header>
    );
  }

  getDropdownContent() {
    if (!this.state.isDropdownOpen) return null;

    return (
      <div className="user-dropdown">
        <div className="user-dropdown-item"><a href="#">Profile</a></div>
        <div className="user-dropdown-item"><a href="#">Account</a></div>
        <div className="divider"></div>
        <div className="user-dropdown-item">
          <a href="#">Posts <span className="badge">(5)</span></a>
        </div>
        <div className="user-dropdown-item">
          <a href="#">Messages <span className="badge">(10)</span></a>
        </div>
        <div className="divider"></div>
        <div className="user-dropdown-item">
          <a href="#" onClick={ this.doLogout }>Logout</a>
        </div>
      </div>
    )
  }
}
