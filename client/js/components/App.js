import Header from 'components/Header';
import Footer from 'components/Footer';
import Loading from 'components/Loading';
import FlashStore from 'stores/FlashStore';
import FlashActions from 'actions/FlashActions';
import FlashMessage from 'components/FlashMessage';
import SessionStore from 'stores/SessionStore';
import SessionActions from 'actions/SessionActions';
import Register from 'components/Register';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      message: null,
      loading: true,
      dropdownOpen: false
    };

    this.closeDropDown = this.closeDropDown.bind(this);
    this.onFlashChange = this.onFlashChange.bind(this);
    this.onSessionChange = this.onSessionChange.bind(this);
  }

  onSessionChange() {
    this.setState({
      loading: false,
      user: SessionStore.user()
    });
  }

  onFlashChange() {
    this.setState({ message: FlashStore.message() });
  }

  componentDidMount() {
    SessionActions.user(SessionStore.token());
    FlashStore.addChangeListener(this.onFlashChange);
    SessionStore.addChangeListener(this.onSessionChange);

    document.title = 'Chahayo | Let your ideas be known to the anime community.'
  }

  componentWillUnmount() {
    FlashStore.removeChangeListener(this.onFlashChange);
    SessionStore.removeChangeListener(this.onSessionChange);
  }

  closeDropDown() {
    this.setState({dropdownOpen: false});
  }

  render() {
    return (
      <Loading loading={this.state.loading}>
        <div className="container" onClick={this.closeDropDown}>
          <Header user={this.state.user} isOpen={this.state.dropdownOpen} />
          <FlashMessage message={this.state.message} />
          <Footer />
        </div>
      </Loading>
    );
  }
}
