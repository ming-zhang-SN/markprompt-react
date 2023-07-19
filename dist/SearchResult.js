"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchResult = void 0;
var _react = _interopRequireWildcard(require("react"));
var _icons = require("./icons.js");
var _index = require("./index.js");
var _excluded = ["href", "title", "heading", "subtitle", "onMouseMove", "onClick"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
// Source: https://github.com/shuding/nextra/blob/main/packages/nextra-theme-docs/src/components/highlight-matches.tsx
var HighlightMatches = (0, _react.memo)(function HighlightMatches(_ref) {
  var value = _ref.value,
    match = _ref.match;
  if (!match || match === '') return <>{value}</>;
  var splitText = value ? value.split('') : [];
  var escapedSearch = match.trim().replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
  var regexp = RegExp('(' + escapedSearch.replaceAll(' ', '|') + ')', 'ig');
  var result;
  var id = 0;
  var index = 0;
  var res = [];
  if (value) {
    while ((result = regexp.exec(value)) !== null) {
      res.push(<_react.Fragment key={id++}>
          {splitText.splice(0, result.index - index).join('')}
          <span className="MarkpromptMatch">
            {splitText.splice(0, regexp.lastIndex - result.index).join('')}
          </span>
        </_react.Fragment>);
      index = regexp.lastIndex;
    }
  }
  return <>
      {res}
      {splitText.join('')}
    </>;
});
var SearchResult = (0, _react.forwardRef)(function (props, ref) {
  var href = props.href,
    title = props.title,
    heading = props.heading,
    subtitle = props.subtitle,
    onMouseMove = props.onMouseMove,
    onClick = props.onClick,
    rest = _objectWithoutProperties(props, _excluded);
  var _useMarkpromptContext = (0, _index.useMarkpromptContext)(),
    searchQuery = _useMarkpromptContext.searchQuery;
  return <li {...rest} ref={ref} className="MarkpromptSearchResult">
        <a href={href} className="MarkpromptSearchResultLink" onMouseMove={onMouseMove} onClick={onClick}>
          <div className="MarkpromptSearchResultContainer">
            <div className="MarkpromptSearchResultIconWrapper MarkpromptSearchResultIconWrapperBordered">
              {href !== null && href !== void 0 && href.includes('#') ? <_icons.HashIcon className="MarkpromptSearchResultIcon" /> : <_icons.FileTextIcon className="MarkpromptSearchResultIcon" />}
            </div>
            <div className="MarkpromptSearchResultContentWrapper">
              {heading && <div className="MarkpromptSearchResultHeading">
                  <HighlightMatches value={heading} match={searchQuery} />
                </div>}
              <div className="MarkpromptSearchResultTitle">
                <HighlightMatches value={title} match={searchQuery} />
              </div>
              {subtitle && <div className="MarkpromptSearchResultSubtitle">
                  <HighlightMatches value={subtitle} match={searchQuery} />
                </div>}
            </div>
          </div>
        </a>
      </li>;
});
exports.SearchResult = SearchResult;
SearchResult.displayName = 'Markprompt.SearchResult';