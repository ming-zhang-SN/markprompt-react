"use strict";

var _react = require("@testing-library/react");
var _react2 = _interopRequireDefault(require("react"));
var _vitest = require("vitest");
var _icons = require("./icons.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var allIcons = [_icons.ChatIcon, _icons.ChevronLeftIcon, _icons.ChevronUpIcon, _icons.CloseIcon, _icons.CommandIcon, _icons.CornerDownLeftIcon, _icons.FileTextIcon, _icons.HashIcon, _icons.SearchIcon, _icons.SparklesIcon, _icons.ThumbsUpIcon, _icons.ThumbsDownIcon];
(0, _vitest.test)('renders the ThumbsDownIcon component', function () {
  for (var i = 0; i < allIcons.length; i++) {
    var Icon = allIcons[i];
    var _render = (0, _react.render)(<Icon data-testid={"test-icon-".concat(i)} />),
      getByTestId = _render.getByTestId;
    var thumbsDownIcon = getByTestId("test-icon-".concat(i));
    (0, _vitest.expect)(thumbsDownIcon).toBeInTheDocument();
  }
});