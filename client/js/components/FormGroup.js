import ReactDOM from 'react-dom';

export default class FormGroup extends React.Component {
  constructor(props) {
    super(props);

    this.onBlur  = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onBlur(event) {
    var input = $(event.target);
    if (!input.val()) {
      input.next('label').removeClass(this.props.activeClass);
    }
  }

  onFocus(event) {
    $(event.target).next('label').addClass(this.props.activeClass);
  }

  onClick(event) {
    var $label = $(event.target)
    $label.addClass(this.props.activeClass);
    $label.prev('input').focus();
  }

  componentDidMount() {
    var group = ReactDOM.findDOMNode(this);
    var input = $(group).children('input');
    var label = $(group).children('label');

    if (label) {
      label.on('click', this.onClick);
    }

    if (input) {
      input.on('blur', this.onBlur);
      input.on('focus', this.onFocus);
    }
  }

  render() {
    return (
      <div className="form-group">
        {this.props.children}
      </div>
    );
  }
}
