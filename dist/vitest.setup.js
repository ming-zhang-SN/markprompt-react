"use strict";

var _matchers = _interopRequireDefault(require("@testing-library/jest-dom/matchers.js"));
var _react = require("@testing-library/react");
var _vitest = require("vitest");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_vitest.expect.extend(_matchers["default"]);
(0, _vitest.beforeAll)(function () {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Element.prototype.scrollTo = function () {};
});
(0, _vitest.afterEach)(function () {
  (0, _react.cleanup)();
});