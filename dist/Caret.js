"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Caret = void 0;
var _react = _interopRequireDefault(require("react"));
var _index = require("./index.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Caret = function Caret() {
  var _useMarkpromptContext = (0, _index.useMarkpromptContext)(),
    answer = _useMarkpromptContext.answer;
  if (answer) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: "MarkpromptCaret"
  });
};
exports.Caret = Caret;