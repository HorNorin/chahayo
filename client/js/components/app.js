import { UserStore } from 'stores/user';
import { UserAction } from 'actions/user';
import HeaderComponent from 'components/header';

export default class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        isUserDropdownOpen: false
      },
      isLoading: true
    };
    this.onUserChanged = this.onUserChanged.bind(this);
    this.resetChildrenState = this.resetChildrenState.bind(this);
    UserStore.addChangedListener(this.onUserChanged);
  }

  componentWillMount() {
    UserAction.getCurrentUser(UserStore.getToken());
  }

  componentWillUnmount() {
    UserStore.removeChangedListener(this.onUserChanged);
  }

  onUserChanged() {
    let data = this.state.data;
    data.user = UserStore.getUser();
    data.isLogin = UserStore.isLogin();
    this.setState({ data: data, isLoading: false });
  }

  resetChildrenState() {
    let data = this.state.data;
    data.isUserDropdownOpen = false;
    this.setState({ data: data });
  }

  render() {
    if (this.state.isLoading) {
      return (<div className="loading"></div>);
    } else {
      return (
        <div className="main" onClick={ this.resetChildrenState }>
          <HeaderComponent data={ this.state.data } />
          { React.cloneElement(this.props.children, { data: this.state.data }) }
        </div>
      );
    }
  }
}
