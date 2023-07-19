"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionalWrap = exports.ConditionalVisuallyHidden = void 0;
var _reactVisuallyHidden = require("@radix-ui/react-visually-hidden");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ConditionalWrap = function ConditionalWrap(props) {
  var condition = props.condition,
    wrap = props.wrap,
    children = props.children;
  return condition ? wrap(children) : children;
};
exports.ConditionalWrap = ConditionalWrap;
var ConditionalVisuallyHidden = function ConditionalVisuallyHidden(props) {
  var hide = props.hide,
    children = props.children;
  return /*#__PURE__*/_react["default"].createElement(ConditionalWrap, {
    condition: hide,
    wrap: function wrap(children) {
      return /*#__PURE__*/_react["default"].createElement(_reactVisuallyHidden.VisuallyHidden, null, children);
    }
  }, children);
};
exports.ConditionalVisuallyHidden = ConditionalVisuallyHidden;