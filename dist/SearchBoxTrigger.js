"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchBoxTrigger = SearchBoxTrigger;
var AccessibleIcon = _interopRequireWildcard(require("@radix-ui/react-accessible-icon"));
var _react = _interopRequireWildcard(require("react"));
var _constants = require("./constants.js");
var _icons = require("./icons.js");
var BaseMarkprompt = _interopRequireWildcard(require("./primitives/headless.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * A button that can be used to open the Markprompt dialog, styled as a search
 * input, displaying a keyboard shortcut. This trigger is relatively positioned
 * in the container where Markprompt is rendered.
 */
function SearchBoxTrigger(props) {
  var trigger = props.trigger,
    setOpen = props.setOpen,
    open = props.open;
  (0, _react.useEffect)(function () {
    var handleKeyDown = function handleKeyDown(event) {
      if (open) return;
      if (event.key === "Enter" && event.ctrlKey || event.key === "Enter" && event.metaKey) {
        event.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);
  return /*#__PURE__*/_react["default"].createElement(BaseMarkprompt.DialogTrigger, {
    className: "MarkpromptSearchBoxTrigger"
  }, /*#__PURE__*/_react["default"].createElement(AccessibleIcon.Root, {
    label: (trigger === null || trigger === void 0 ? void 0 : trigger.label) !== undefined && (trigger === null || trigger === void 0 ? void 0 : trigger.label) != null ? trigger === null || trigger === void 0 ? void 0 : trigger.label : _constants.DEFAULT_MARKPROMPT_OPTIONS.trigger.label
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "MarkpromptSearchBoxTriggerContent"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "MarkpromptSearchBoxTriggerText"
  }, /*#__PURE__*/_react["default"].createElement(_icons.SearchIcon, {
    width: 16,
    height: 16
  }), " ", (trigger === null || trigger === void 0 ? void 0 : trigger.placeholder) || "Search", " "), /*#__PURE__*/_react["default"].createElement("kbd", null, navigator.platform.indexOf("Mac") === 0 || navigator.platform === "iPhone" ? /*#__PURE__*/_react["default"].createElement(_icons.CommandIcon, {
    className: "MarkpromptKeyboardKey"
  }) : /*#__PURE__*/_react["default"].createElement(_icons.ChevronUpIcon, {
    className: "MarkpromptKeyboardKey"
  }), /*#__PURE__*/_react["default"].createElement(_icons.CornerDownLeftIcon, {
    className: "MarkpromptKeyboardKey"
  })))));
}