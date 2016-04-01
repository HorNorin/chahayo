import ReactDOM from 'react-dom';
import App from 'components/App';
import Login from 'components/Login';
import Logout from 'components/Logout';
import Register from 'components/Register';
import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/register" component={Register} />
  </Router>
), document.getElementById('app'));
