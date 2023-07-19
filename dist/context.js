"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = exports.MarkpromptContext = void 0;
exports.useMarkpromptContext = useMarkpromptContext;
var _react = require("react");
// eslint-disable-next-line @typescript-eslint/no-empty-function
var noop = function noop() {};
exports.noop = noop;
var MarkpromptContext = (0, _react.createContext)({
  activeView: 'prompt',
  answer: undefined,
  isSearchEnabled: false,
  searchProvider: undefined,
  prompt: '',
  references: [],
  searchQuery: '',
  searchResults: [],
  state: 'indeterminate',
  abort: noop,
  setActiveView: noop,
  setPrompt: noop,
  setSearchQuery: noop,
  submitFeedback: noop,
  submitPrompt: noop,
  submitSearchQuery: noop
});
exports.MarkpromptContext = MarkpromptContext;
function useMarkpromptContext() {
  return (0, _react.useContext)(MarkpromptContext);
}