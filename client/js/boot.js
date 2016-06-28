import ReactDOM from 'react-dom';
import AppComponent from './components/app';
import HomeComponent from './components/home';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

String.prototype.capitialize = function() {
  let tokens = this.toString().split(' ');
  let length = tokens.length;
  for (let i = 0; i < length; ++i) {
    tokens[i] = `${tokens[i].substr(0, 1)}${tokens[i].substr(1)}`;
  }

  return tokens.join(' ');
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={ AppComponent }>
      <IndexRoute component={ HomeComponent } />
    </Route>
  </Router>
), document.getElementById('app'));
