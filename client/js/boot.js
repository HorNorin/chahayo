import ReactDOM from 'react-dom';
import AppComponent from './components/app';
import HomeComponent from './components/home';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={ AppComponent }>
      <IndexRoute component={ HomeComponent } />
    </Route>
  </Router>
), document.getElementById('app'));
