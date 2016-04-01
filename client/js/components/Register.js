import FormGroup from 'components/FormGroup';
import { browserHistory } from 'react-router';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';
import FlashActions from 'actions/FlashActions';
import SessionActions from 'actions/SessionActions';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEnabled: false,
      errors: {},
      serverErrors: {}
    };

    this.rules = {
      REQUIRED: 'required',
      CONFIRM: 'confirm'
    };

    this.validations = {
      name: this.rules.REQUIRED,
      email: this.rules.REQUIRED,
      confirm: `${this.rules.REQUIRED}|${this.rules.CONFIRM}:password`,
      password: `${this.rules.REQUIRED}|${this.rules.CONFIRM}:confirm`
    };

    this.doRegister = this.doRegister.bind(this);
    this.validate = this.validate.bind(this);
    this.onRegisterationChange = this.onRegisterationChange.bind(this);
  }

  onRegisterationChange() {
    var user = UserStore.registeredUser();

    if (user) {
      FlashActions.success('Successfully registered.');
      browserHistory.push({
        pathname: '/login',
        state: {
          email: user.email,
          from: '/register'
        }
      });
    } else {
      this.refs.password.value = '';
      this.refs.confirm.value = '';
      this.setState({serverErrors: UserStore.errors()});
    }
  }

  doRegister(event) {
    event.preventDefault();

    var userParams = {
      user: {
        username: this.refs.name.value,
        email: this.refs.email.value,
        password: this.refs.password.value,
        password_confirmation: this.refs.confirm.value
      }
    };

    UserActions.register(userParams);
  }

  validate(event) {
    if (!this.readyToValidate) return;

    var ref = event.target.name;
    var rules = this.validations[ref].split('|');

    _.forEach(rules, (item) => {
      var items = item.split(':');
      var rule = items[0];
      var compareToRef = items[1];
      this._validate(ref, rule, compareToRef);
    });
  }

  componentWillMount() {
    this.readyToValidate = false;
  }

  componentDidMount() {
    this.readyToValidate = true;

    this.refs.name.focus();
    UserStore.addChangeListener(this.onRegisterationChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.onRegisterationChange);
  }

  render() {
    return (
      <div className="register form-area">
        <h1 className="center">Member Registration</h1>
        {this._serverErrorMessages()}
        <form className="form" onSubmit={this.doRegister}>
          <FormGroup activeClass="active">
            <input type="text" ref="name" name="name"
              onChange={this.validate}
              onBlur={this.validate}
              className={this._errorClass('name')} />
            <label htmlFor="name">
              {this._errorLabel('name')}
            </label>
          </FormGroup>
          <FormGroup activeClass="active">
            <input type="email" ref="email" name="email"
              onChange={this.validate}
              onBlur={this.validate}
              className={this._errorClass('email')} />
            <label htmlFor="email">
              {this._errorLabel('email')}
            </label>
          </FormGroup>
          <FormGroup activeClass="active">
            <input type="password" ref="password" name="password"
              onChange={this.validate}
              onBlur={this.validate}
              className={this._errorClass('password')} />
            <label htmlFor="password">
              {this._errorLabel('password')}
            </label>
          </FormGroup>
          <FormGroup activeClass="active">
            <input type="password" ref="confirm" name="confirm"
              onChange={this.validate}
              onBlur={this.validate}
              className={this._errorClass('confirm')} />
            <label htmlFor="confirm">
              {this._errorLabel('confirm')}
            </label>
          </FormGroup>
          <div className="form-group">
            <button className={this._buttonClass()}
              disabled={!this.state.isEnabled}
              onClick={this.doRegister}>
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }

  _serverErrorMessages() {
    if (_.isEmpty(this.state.serverErrors)) return null;

    var errorNodes = _.map(this.state.serverErrors, (value, key) => {
      return (
        <li key={`${key}-${value}`}>{`${_.capitalize(key)}: ${_.capitalize(value)}`}</li>
      );
    });

    return (
      <div className="alert alert-danger">
        <ul>{errorNodes}</ul>
      </div>
    );
  }

  _validate(ref, rule, compareToRef) {
    switch (rule) {
      case this.rules.REQUIRED:
        this._setError(ref, rule, !this.refs[ref].value);
        break;

      case this.rules.CONFIRM:
        var value = this.refs[ref].value;
        var compareToValue = this.refs[compareToRef] ?
          this.refs[compareToRef].value : null;

        this._setError(ref, rule, value != compareToValue);
        this._setError(compareToRef, rule, value != compareToValue);
        break;
    }
  }

  _setError(ref, rule, invalid) {
    var errors = this.state.errors;
    var controlError = errors[ref] || {};

    if (invalid) {
      controlError[rule] = 'invalid';
    } else {
      delete controlError[rule];
    }

    if (!_.isEmpty(controlError)) {
      errors[ref] = controlError;
    } else {
      delete errors[ref];
    }

    this.setState({
      errors: errors,
      isEnabled: _.isEmpty(errors)
    });
  }

  _errorClass(controlName) {
    return _.isEmpty(this.state.errors[controlName]) ? '' : 'invalid';
  }

  _errorLabel(controlName) {
    var label = _.capitalize(controlName);
    return _.isEmpty(this.state.errors[controlName]) ? label : `${label}*`;
  }

  _buttonClass() {
    if (this.state.isEnabled) {
      return 'btn';
    } else {
      return 'btn disabled';
    }
  }
}
