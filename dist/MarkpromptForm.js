"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkpromptForm = MarkpromptForm;
var AccessibleIcon = _interopRequireWildcard(require("@radix-ui/react-accessible-icon"));
var _react = _interopRequireWildcard(require("react"));
var _constants = require("./constants.js");
var _context = require("./context.js");
var _icons = require("./icons.js");
var BaseMarkprompt = _interopRequireWildcard(require("./primitives/headless.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function MarkpromptForm(props) {
  var inputProps = props.inputProps,
    label = props.label,
    placeholder = props.placeholder,
    icon = props.icon,
    close = props.close;
  var _useMarkpromptContext = (0, _context.useMarkpromptContext)(),
    activeView = _useMarkpromptContext.activeView;
  var inputRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var _inputRef$current;
    // Bring form input in focus when activeView changes.
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
  }, [activeView]);
  return /*#__PURE__*/_react["default"].createElement(BaseMarkprompt.Form, {
    className: "MarkpromptForm"
  }, /*#__PURE__*/_react["default"].createElement(BaseMarkprompt.Prompt, _extends({}, inputProps, {
    ref: inputRef,
    className: "MarkpromptPrompt",
    placeholder: placeholder,
    labelClassName: "MarkpromptPromptLabel",
    label: /*#__PURE__*/_react["default"].createElement(AccessibleIcon.Root, {
      label: label
    }, icon === "search" ? /*#__PURE__*/_react["default"].createElement(_icons.SearchIcon, {
      className: "MarkpromptSearchIcon"
    }) : /*#__PURE__*/_react["default"].createElement(_icons.SparklesIcon, {
      className: "MarkpromptSearchIcon"
    }))
  })), close && close.visible !== false && /*#__PURE__*/_react["default"].createElement(BaseMarkprompt.Close, {
    className: "MarkpromptClose"
  }, /*#__PURE__*/_react["default"].createElement(AccessibleIcon.Root, {
    label: (close === null || close === void 0 ? void 0 : close.label) !== undefined && (close === null || close === void 0 ? void 0 : close.label) != null ? close === null || close === void 0 ? void 0 : close.label : _constants.DEFAULT_MARKPROMPT_OPTIONS.close.label
  }, /*#__PURE__*/_react["default"].createElement("kbd", null, "Esc"))));
}