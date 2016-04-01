import FlashStore from 'stores/FlashStore';
import FlashActions from 'actions/FlashActions';

export default class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.bindSlideupEvent();
  }

  componentDidUpdate() {
    this.bindSlideupEvent();
  }

  bindSlideupEvent() {
    if (!_.isEmpty(this.props.message)) {
      $('.alert').delay(3000).slideUp(300);
    }
  }

  render() {
    if (_.isEmpty(this.props.message)) return null;

    return (
      <div className={ `alert alert-${this.props.message.type}` }>
        { this.props.message.text }
      </div>
    );
  }
}
