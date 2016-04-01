import TestUtils from 'react-addons-test-utils';
import FlashMessage from 'components/FlashMessage';

describe('FlashMessage: Component', () => {
  var components;

  describe('when there is no message', () => {
    beforeEach(() => {
      components = TestUtils.renderIntoDocument(
        <FlashMessage />
      );
    });

    it('should render nothing', () => {
      var messageNode = TestUtils
        .scryRenderedDOMComponentsWithClass(components, 'alert');

      expect(messageNode.length).toBe(0);
    });
  });

  describe('when there is a message', () => {
    beforeEach(() => {
      components = TestUtils.renderIntoDocument(
        <FlashMessage message={ {type: 'success', text: 'This is message'} } />
      );
    });

    it('should render message', () => {
      var messageNode = TestUtils
        .findRenderedDOMComponentWithClass(components, 'alert-success');

      expect(messageNode).toBeDefined();
      expect(messageNode.textContent).toBe('This is message');
    });
  });
});
