"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PromptView = PromptView;
var _react = _interopRequireDefault(require("react"));
var _Answer = require("./Answer.js");
var _constants = require("./constants.js");
var _MarkpromptForm = require("./MarkpromptForm.js");
var BaseMarkprompt = _interopRequireWildcard(require("./primitives/headless.js"));
var _References = require("./References.js");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function PromptView(props) {
  var prompt = props.prompt,
    references = props.references,
    close = props.close,
    onDidSelectReference = props.onDidSelectReference;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "MarkpromptPromptView"
  }, /*#__PURE__*/_react["default"].createElement(_MarkpromptForm.MarkpromptForm, {
    label: (prompt === null || prompt === void 0 ? void 0 : prompt.label) !== undefined && (prompt === null || prompt === void 0 ? void 0 : prompt.label) != null ? prompt === null || prompt === void 0 ? void 0 : prompt.label : _constants.DEFAULT_MARKPROMPT_OPTIONS.prompt.label,
    placeholder: (prompt === null || prompt === void 0 ? void 0 : prompt.placeholder) !== undefined && (prompt === null || prompt === void 0 ? void 0 : prompt.placeholder) != null ? prompt === null || prompt === void 0 ? void 0 : prompt.placeholder : _constants.DEFAULT_MARKPROMPT_OPTIONS.prompt.placeholder,
    icon: "prompt",
    close: close
  }), /*#__PURE__*/_react["default"].createElement(AnswerContainer, {
    references: references,
    onDidSelectReference: onDidSelectReference
  }));
}
function AnswerContainer(_ref) {
  var references = _ref.references,
    onDidSelectReference = _ref.onDidSelectReference;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "MarkpromptAnswerContainer"
  }, /*#__PURE__*/_react["default"].createElement(BaseMarkprompt.AutoScroller, {
    className: "MarkpromptAutoScroller"
  }, /*#__PURE__*/_react["default"].createElement(_Answer.Answer, null)), /*#__PURE__*/_react["default"].createElement(_References.References, {
    loadingText: references === null || references === void 0 ? void 0 : references.loadingText,
    transformReferenceId: references === null || references === void 0 ? void 0 : references.transformReferenceId,
    getLabel: references === null || references === void 0 ? void 0 : references.getLabel,
    getHref: references === null || references === void 0 ? void 0 : references.getHref,
    onDidSelectReference: onDidSelectReference
  }));
}