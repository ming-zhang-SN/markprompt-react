"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_MARKPROMPT_OPTIONS = void 0;
var _core = require("@markprompt/core");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var removeFileExtension = function removeFileExtension(fileName) {
  var lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return fileName;
  }
  return fileName.substring(0, lastDotIndex);
};
var pathToHref = function pathToHref(path) {
  var lastDotIndex = path.lastIndexOf('.');
  var cleanPath = path;
  if (lastDotIndex >= 0) {
    cleanPath = path.substring(0, lastDotIndex);
  }
  if (cleanPath.endsWith('/index')) {
    cleanPath = cleanPath.replace(/\/index/gi, '');
  }
  return cleanPath;
};
function trimContent(text) {
  // we don't use String.prototype.trim() because we
  // don't want to remove line terminators from Markdown
  return text.trimStart().trimEnd();
}
function removeLeadHeading(text, heading) {
  // This needs to be revised. When returning the search result, the endpoint
  // provides a snippet of the content around the search term (to avoid sending
  // entire sections). This snippet may contain the start of the section
  // content, and this content may start with a heading (the leadHeading).
  // We don't want this leadHeading to be part of the content snippet.
  // Since it's a snippet, we can't assume that the leadHeading will always be
  // the first line. Instead, we have to check it in the string itself.
  var trimmedContent = trimContent(text);
  if (!heading) {
    return trimmedContent;
  }
  var pattern = new RegExp("^#{1,}\\s".concat(heading, "\\s?"));
  return trimContent(trimmedContent.replace(pattern, ''));
}
function createKWICSnippet(content, normalizedSearchQuery) {
  var trimmedContent = content.trim().replace(/\n/g, ' ');
  var index = trimmedContent.toLocaleLowerCase().indexOf(normalizedSearchQuery);
  if (index === -1) {
    return trimmedContent.slice(0, 200);
  }
  var rawSnippet = trimmedContent.slice(Math.max(0, index - 50), index + 150);
  var words = rawSnippet.split(/\s+/);
  if (words.length > 3) {
    return words.slice(1, words.length - 1).join(' ');
  }
  return words.join(' ');
}
var defaultPromptGetLabel = function defaultPromptGetLabel(reference) {
  var _reference$meta, _reference$file;
  return ((_reference$meta = reference.meta) === null || _reference$meta === void 0 || (_reference$meta = _reference$meta.leadHeading) === null || _reference$meta === void 0 ? void 0 : _reference$meta.value) || ((_reference$file = reference.file) === null || _reference$file === void 0 ? void 0 : _reference$file.title) || removeFileExtension(reference.file.path.split('/').slice(-1)[0]);
};
var defaultGetHref = function defaultGetHref(result) {
  var _reference$meta2, _reference$meta3;
  if (result.url) {
    return result.url;
  }
  var reference = result;
  var path = pathToHref(reference.file.path);
  if ((_reference$meta2 = reference.meta) !== null && _reference$meta2 !== void 0 && (_reference$meta2 = _reference$meta2.leadHeading) !== null && _reference$meta2 !== void 0 && _reference$meta2.id) {
    return "".concat(path, "#").concat(reference.meta.leadHeading.id);
  } else if ((_reference$meta3 = reference.meta) !== null && _reference$meta3 !== void 0 && (_reference$meta3 = _reference$meta3.leadHeading) !== null && _reference$meta3 !== void 0 && _reference$meta3.value) {
    return "".concat(path, "#").concat(reference.meta.leadHeading.slug);
  }
  return path;
};
var defaultGetSearchResultHeading = function defaultGetSearchResultHeading(result) {
  if (result.hierarchy) {
    return result.hierarchy.lvl0 || undefined;
  }
  var res = result;
  if (res.matchType === 'title') {
    return undefined;
  } else {
    var _res$meta;
    var leadHeading = (_res$meta = res.meta) === null || _res$meta === void 0 ? void 0 : _res$meta.leadHeading;
    if (res.matchType === 'leadHeading' && leadHeading !== null && leadHeading !== void 0 && leadHeading.value) {
      return res.file.title;
    } else {
      return (leadHeading === null || leadHeading === void 0 ? void 0 : leadHeading.value) || res.file.title;
    }
  }
};
var defaultGetSearchResultTitle = function defaultGetSearchResultTitle(result, query) {
  if (result.hierarchy) {
    return result.hierarchy.lvl1 || undefined;
  }
  var res = result;
  if (res.matchType === 'title') {
    return res.file.title;
  } else {
    var _res$meta2;
    var leadHeading = (_res$meta2 = res.meta) === null || _res$meta2 === void 0 ? void 0 : _res$meta2.leadHeading;
    if (res.matchType === 'leadHeading' && leadHeading !== null && leadHeading !== void 0 && leadHeading.value) {
      return leadHeading.value;
    } else {
      var _res$meta3;
      // return removeLeadHeading(res.snippet || '', leadHeading?.value);
      var normalizedSearchQuery = query.toLowerCase();
      // Fast and hacky way to remove the lead heading from
      // the content, which we don't want to be part of the snippet.
      var trimmedContent = removeLeadHeading(res.snippet || '', (_res$meta3 = res.meta) === null || _res$meta3 === void 0 || (_res$meta3 = _res$meta3.leadHeading) === null || _res$meta3 === void 0 ? void 0 : _res$meta3.value);
      return createKWICSnippet(trimmedContent, normalizedSearchQuery);
    }
  }
};
var defaultGetSearchResultSubtitle = function defaultGetSearchResultSubtitle(result) {
  if (result.hierarchy) {
    return result.hierarchy.lvl2 || undefined;
  }
  return undefined;
};
var DEFAULT_MARKPROMPT_OPTIONS = {
  display: 'dialog',
  close: {
    label: 'Close Markprompt',
    visible: true
  },
  description: {
    hide: true,
    text: 'Markprompt'
  },
  feedback: {
    enabled: false,
    heading: 'Was this response helpful?',
    confirmationMessage: 'Thank you!'
  },
  prompt: _objectSpread(_objectSpread({}, _core.DEFAULT_SUBMIT_PROMPT_OPTIONS), {}, {
    label: 'Ask AI',
    tabLabel: 'Ask AI',
    placeholder: 'Ask AI…'
  }),
  references: {
    loadingText: 'Fetching relevant pages…',
    heading: 'Answer generated from the following sources:',
    getHref: defaultGetHref,
    getLabel: defaultPromptGetLabel
  },
  search: _objectSpread(_objectSpread({}, _core.DEFAULT_SUBMIT_SEARCH_QUERY_OPTIONS), {}, {
    enabled: false,
    getHref: defaultGetHref,
    getHeading: defaultGetSearchResultHeading,
    getTitle: defaultGetSearchResultTitle,
    getSubtitle: defaultGetSearchResultSubtitle,
    label: 'Search docs…',
    tabLabel: 'Search',
    placeholder: 'Search docs…'
  }),
  trigger: {
    label: 'Open Markprompt',
    placeholder: 'Ask docs',
    floating: true,
    customElement: false
  },
  title: {
    hide: true,
    text: 'Ask AI'
  },
  showBranding: true
};
exports.DEFAULT_MARKPROMPT_OPTIONS = DEFAULT_MARKPROMPT_OPTIONS;