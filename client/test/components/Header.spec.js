import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Header from 'components/Header';
import SessionStore from 'stores/SessionStore';
import SessionActions from 'actions/SessionActions';
import FlashActions from 'actions/FlashActions';
import { browserHistory } from 'react-router';

describe('Header: Component', () => {
  var components;
  var container = document.createElement('div');

  describe('when user logged in', () => {
    beforeEach(() => {
      components = ReactDOM.render(
        <Header user={ {id: '1234', username: 'Norin'} } />,
        container
      );
    });

    it('should render username and dropdown', () => {
      var usernameNode = TestUtils
        .findRenderedDOMComponentWithClass(components, 'header-username');

      expect(usernameNode).toBeDefined();
      expect(usernameNode.textContent).toBe('Norin');

      var dropdownNode = TestUtils
        .findRenderedDOMComponentWithClass(components, 'header-dropdown');

      expect(dropdownNode).toBeDefined();
      expect(dropdownNode.childNodes.length).toBe(4);
    });

    describe('dropdown list', () => {
      var usernameNode;

      beforeEach(() => {
        usernameNode = TestUtils
          .findRenderedDOMComponentWithClass(components, 'header-username');
      });

      it('should toggle open/close when user click on username', () => {
        TestUtils.Simulate.click(usernameNode);

        expect(TestUtils.findRenderedDOMComponentWithClass(
          components, 'header-dropdown open'
        )).toBeDefined();

        TestUtils.Simulate.click(usernameNode);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(
          components, 'header-dropdown open'
        ).length).toBe(0);
      });
    });
  });

  describe('when user is not login', () => {
    beforeEach(() => {
      components = ReactDOM.render(
        <Header />,
        container
      );
    });

    it('should render login form', () => {
      var formNode = TestUtils
        .findRenderedDOMComponentWithClass(components, 'form-inline');

      expect(formNode).toBeDefined();
    });

    describe('login success', () => {
      beforeEach(() => {
        jasmine.Ajax.install();
        spyOn(FlashActions, 'success');

        TestUtils.Simulate.click(
          TestUtils.findRenderedDOMComponentWithTag(components, 'button')
        );

        var request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          status: 200,
          responseText: '{"user": {"token": "12345"}}'
        });
      });

      afterEach(() => {
        jasmine.Ajax.uninstall();
      });

      it('should set flash message', () => {
        expect(FlashActions.success)
          .toHaveBeenCalledWith('Successfully logged in.');
      });
    });

    describe('login error', () => {
      beforeEach(() => {
        jasmine.Ajax.install();
        spyOn(browserHistory, 'push');

        var txtEmail = components.refs.txtEmail;
        txtEmail.value = 'test@example.com';
        TestUtils.Simulate.change(txtEmail);
        TestUtils.Simulate.click(
          TestUtils.findRenderedDOMComponentWithTag(components, 'button')
        );

        var request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          status: 402,
          responseText: ''
        });
      });

      afterEach(() => {
        jasmine.Ajax.uninstall();
      });

      it('should redirect to login page with input email address', () => {
        expect(browserHistory.push).toHaveBeenCalledWith({
          pathname: '/login',
          state: {email: 'test@example.com'}
        });
      });
    });
  });
});
