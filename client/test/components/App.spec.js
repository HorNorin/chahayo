import App from 'components/App';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import FlashActions from 'actions/FlashActions';
import SessionStore from 'stores/SessionStore';

describe('App: Component', () => {
  var components;
  var container = document.createElement('div');

  beforeEach(() => {
    components = ReactDOM.render(
      <App />,
      container
    );
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  describe('in loading stage', () => {
    it('should render loading image', () => {
      expect(TestUtils.findRenderedDOMComponentWithClass(
        components,
        'loading'
      )).toBeDefined();
    });
  });

  describe('after loading stage', () => {
    beforeEach(() => {
      SessionStore.emitChange();
    });

    it('should render header', () => {
      expect(TestUtils.findRenderedDOMComponentWithClass(
        components,
        'header'
      )).toBeDefined();
    });

    it('should render footer', () => {
      expect(TestUtils.findRenderedDOMComponentWithClass(
        components,
        'footer'
      )).toBeDefined();
    });
  });

  describe('when user logged in', () => {
    beforeEach(() => {
      spyOn(SessionStore, 'user').and.returnValue({username: 'Norin'});
      SessionStore.emitChange();
    });

    it('should set state.user to logged in user', () => {
      expect(components.state.user).toEqual({username: 'Norin'});
    });
  });

  describe('when user is not login', () => {
    beforeEach(() => {
      spyOn(SessionStore, 'user').and.returnValue(null);
      SessionStore.emitChange();
    });

    it('should set state.user to null', () => {
      expect(components.state.user).toEqual(null);
    });
  });

  describe('with flash message', () => {
    beforeEach(() => {
      components = ReactDOM.render(
        <App />,
        container
      );

      SessionStore.emitChange();

      jasmine.clock().install();
      FlashActions.success('Flash message');
      jasmine.clock().tick(0);
    });

    afterEach(() => {
      jasmine.clock().uninstall();
      ReactDOM.unmountComponentAtNode(container);
    });

    it('should render with flash message', () => {
      var flashNode = TestUtils
        .findRenderedDOMComponentWithClass(components, 'alert');

      expect(flashNode).toBeDefined();
      expect(flashNode.textContent).toBe('Flash message');
    });
  });

  describe('without flash message', () => {
    it('should render with flash message', () => {
      var flashNode = TestUtils
        .scryRenderedDOMComponentsWithClass(components, 'alert');

      expect(flashNode.length).toBe(0);
    });
  });
});
