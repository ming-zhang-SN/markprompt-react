"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchView = SearchView;
var _react = _interopRequireWildcard(require("react"));
var _constants = require("./constants.js");
var _context = require("./context.js");
var _MarkpromptForm = require("./MarkpromptForm.js");
var BaseMarkprompt = _interopRequireWildcard(require("./primitives/headless.js"));
var _SearchResult = require("./SearchResult.js");
var _excluded = ["index"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function SearchView(props) {
  var search = props.search,
    close = props.close,
    handleViewChange = props.handleViewChange,
    onDidSelectResult = props.onDidSelectResult;
  var _React$useState = _react["default"].useState(),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeSearchResult = _React$useState2[0],
    setActiveSearchResult = _React$useState2[1];
  var _useMarkpromptContext = (0, _context.useMarkpromptContext)(),
    searchResults = _useMarkpromptContext.searchResults,
    searchQuery = _useMarkpromptContext.searchQuery;
  (0, _react.useEffect)(function () {
    // if the search query changes, unset the active search result
    setActiveSearchResult(undefined);
  }, [searchQuery]);
  (0, _react.useEffect)(function () {
    // if the search results change, set the active search result to the
    // first result
    if (searchResults.length === 0) return;
    setActiveSearchResult({
      id: "markprompt-result-0"
    });
  }, [searchResults]);
  var handleKeyDown = (0, _react.useCallback)(function (event) {
    switch (event.key) {
      case "ArrowDown":
        {
          var _activeSearchResult$i, _activeSearchResult$i2;
          if (!activeSearchResult) return;
          if ((_activeSearchResult$i = activeSearchResult.id) !== null && _activeSearchResult$i !== void 0 && _activeSearchResult$i.endsWith("".concat(searchResults.length - 1))) {
            return;
          }
          event.preventDefault();
          var nextActiveSearchResultId = (_activeSearchResult$i2 = activeSearchResult.id) === null || _activeSearchResult$i2 === void 0 ? void 0 : _activeSearchResult$i2.replace(/\d+$/, function (match) {
            return String(Number(match) + 1);
          });
          setActiveSearchResult({
            id: nextActiveSearchResultId,
            trigger: "keyboard"
          });
          var el = document.querySelector("#".concat(nextActiveSearchResultId, " > a"));
          if (!el) return;
          break;
        }
      case "ArrowUp":
        {
          var _activeSearchResult$i3, _activeSearchResult$i4;
          if (!activeSearchResult) return;
          if ((_activeSearchResult$i3 = activeSearchResult.id) !== null && _activeSearchResult$i3 !== void 0 && _activeSearchResult$i3.endsWith("-0")) return;
          event.preventDefault();
          var nextActiveSearchResult = (_activeSearchResult$i4 = activeSearchResult.id) === null || _activeSearchResult$i4 === void 0 ? void 0 : _activeSearchResult$i4.replace(/\d+$/, function (match) {
            return String(Number(match) - 1);
          });
          setActiveSearchResult({
            id: nextActiveSearchResult,
            trigger: "keyboard"
          });
          var _el = document.querySelector("#".concat(nextActiveSearchResult, " > a"));
          if (!_el) return;
          break;
        }
      case "Enter":
        {
          if (event.ctrlKey || event.metaKey) return;
          if (!activeSearchResult) return;
          event.preventDefault();
          // assumption here is that the search result will always contain an a element
          var _el2 = document.querySelector("#".concat(activeSearchResult.id, " a"));
          // todo: reset search query and result
          if (!_el2) return;
          _el2 === null || _el2 === void 0 ? void 0 : _el2.click();
          break;
        }
    }
  }, [activeSearchResult, searchResults.length]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "MarkpromptSearchView"
  }, /*#__PURE__*/_react["default"].createElement(_MarkpromptForm.MarkpromptForm, {
    label: (search === null || search === void 0 ? void 0 : search.label) !== undefined && (search === null || search === void 0 ? void 0 : search.label) != null ? search === null || search === void 0 ? void 0 : search.label : _constants.DEFAULT_MARKPROMPT_OPTIONS.search.label,
    placeholder: (search === null || search === void 0 ? void 0 : search.placeholder) !== undefined && (search === null || search === void 0 ? void 0 : search.placeholder) != null ? search === null || search === void 0 ? void 0 : search.placeholder : _constants.DEFAULT_MARKPROMPT_OPTIONS.search.placeholder,
    inputProps: (0, _react.useMemo)(function () {
      return {
        onKeyDown: handleKeyDown,
        "aria-controls": "markprompt-search-results",
        "aria-activedescendant": activeSearchResult === null || activeSearchResult === void 0 ? void 0 : activeSearchResult.id
      };
    }, [activeSearchResult, handleKeyDown]),
    icon: "search",
    close: close
  }), /*#__PURE__*/_react["default"].createElement(SearchResultsContainer, {
    activeSearchResult: activeSearchResult,
    search: search,
    handleViewChange: handleViewChange,
    onDidSelectResult: onDidSelectResult,
    setActiveSearchResult: setActiveSearchResult
  }));
}
function SearchResultsContainer(props) {
  var activeSearchResult = props.activeSearchResult,
    handleViewChange = props.handleViewChange,
    setActiveSearchResult = props.setActiveSearchResult,
    onDidSelectResult = props.onDidSelectResult,
    search = props.search;
  var onMouseMovedOverSearchResult = (0, _react.useRef)(null);
  var _useMarkpromptContext2 = (0, _context.useMarkpromptContext)(),
    searchQuery = _useMarkpromptContext2.searchQuery,
    searchResults = _useMarkpromptContext2.searchResults,
    state = _useMarkpromptContext2.state,
    submitPrompt = _useMarkpromptContext2.submitPrompt;
  (0, _react.useEffect)(function () {
    var handleKeyDown = function handleKeyDown(event) {
      if (event.key === "ArrowDown") {
        if (searchResults.length > 0 && activeSearchResult === undefined) {
          setActiveSearchResult({
            id: "markprompt-result-0",
            trigger: "keyboard"
          });
          var el = document.querySelector("#markprompt-prompt");
          if (el instanceof HTMLInputElement) el.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSearchResult, searchResults, submitPrompt, handleViewChange, setActiveSearchResult]);
  (0, _react.useEffect)(function () {
    // Do not scroll into view unless using keyboard navigation.
    // While using the mouse, we don't want movable hit targets.
    if (!(activeSearchResult !== null && activeSearchResult !== void 0 && activeSearchResult.id) || activeSearchResult.trigger !== "keyboard") {
      return;
    }
    var element = document.getElementById(activeSearchResult.id);
    if (!element) {
      return;
    }
    element.focus();
    element.scrollIntoView({
      block: "nearest"
    });
  }, [activeSearchResult, searchResults]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "MarkpromptSearchResultsContainer"
  }, state === "done" && searchResults.length === 0 && searchQuery.trim().length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "MarkpromptNoSearchResults"
  }, /*#__PURE__*/_react["default"].createElement("p", null, "No results for \u201C", /*#__PURE__*/_react["default"].createElement("span", null, searchQuery), "\u201D")), searchResults.length > 0 && /*#__PURE__*/_react["default"].createElement(BaseMarkprompt.SearchResults, {
    className: "MarkpromptSearchResults",
    SearchResultComponent: function SearchResultComponent(_ref) {
      var index = _ref.index,
        rest = _objectWithoutProperties(_ref, _excluded);
      var id = "markprompt-result-".concat(index);
      return /*#__PURE__*/_react["default"].createElement(_SearchResult.SearchResult, _extends({}, rest, {
        id: id,
        onMouseMove: function onMouseMove() {
          // We use a mouse move event, instead of mouse over or
          // mouse enter. Indeed, onMouseOver and onMouseEnter will
          // trigger at each rerender. This is a problem when scrolling
          // the list using the keyboard: it will automatically reselect
          // the result that the mouse is over.
          if ((onMouseMovedOverSearchResult === null || onMouseMovedOverSearchResult === void 0 ? void 0 : onMouseMovedOverSearchResult.current) === id) {
            return;
          }
          onMouseMovedOverSearchResult.current = id;
          setActiveSearchResult({
            id: id,
            trigger: "mouse"
          });
        },
        onClick: onDidSelectResult,
        "aria-selected": id === (activeSearchResult === null || activeSearchResult === void 0 ? void 0 : activeSearchResult.id)
      }));
    }
  }));
}