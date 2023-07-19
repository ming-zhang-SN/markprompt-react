"use strict";

var _react = require("@testing-library/react");
var _react2 = _interopRequireDefault(require("react"));
var _vitest = require("vitest");
var _footer = require("./footer.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _vitest.describe)('Footer', function () {
  (0, _vitest.test)('render a footer', function () {
    (0, _react.render)( /*#__PURE__*/_react2["default"].createElement(_footer.Footer, null));
    var element = _react.screen.getByText(/Powered by/);
    (0, _vitest.expect)(element).toBeInTheDocument();
    (0, _vitest.expect)(element.textContent).toBe('Powered by Markprompt AI');
    var anchor = _react.screen.getByText('Markprompt AI');
    (0, _vitest.expect)(anchor.href).toBe('https://markprompt.com/');
  });
});
(0, _vitest.describe)('MarkpromptIcon', function () {
  (0, _vitest.test)('render SVG icon', function () {
    (0, _react.render)( /*#__PURE__*/_react2["default"].createElement(_footer.MarkpromptIcon, null));
    var svg = document.querySelector('svg');
    (0, _vitest.expect)(svg).toBeInTheDocument();
  });
  (0, _vitest.test)('custom className', function () {
    (0, _react.render)( /*#__PURE__*/_react2["default"].createElement(_footer.MarkpromptIcon, {
      className: "custom-class"
    }));
    var svg = document.querySelector('svg');
    (0, _vitest.expect)(svg).toHaveClass('custom-class');
  });

  // test('custom style', () => {
  //   render(<MarkpromptIcon style={{ color: 'tomato' }} />);

  //   const svg = document.querySelector('svg');
  //   expect(svg).toHaveStyle({ color: 'tomato' });
  // });
});