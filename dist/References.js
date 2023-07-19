"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.References = void 0;
var _web = require("@react-spring/web");
var _react = _interopRequireWildcard(require("react"));
var _constants = require("./constants.js");
var Markprompt = _interopRequireWildcard(require("./index.js"));
var _useElementSize3 = require("./useElementSize.js");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var Reference = function Reference(props) {
  var _props$getHref = props.getHref,
    getHref = _props$getHref === void 0 ? _constants.DEFAULT_MARKPROMPT_OPTIONS.references.getHref : _props$getHref,
    _props$getLabel = props.getLabel,
    getLabel = _props$getLabel === void 0 ? _constants.DEFAULT_MARKPROMPT_OPTIONS.references.getLabel : _props$getLabel,
    index = props.index,
    reference = props.reference,
    transformReferenceId = props.transformReferenceId,
    onDidSelectReference = props.onDidSelectReference;
  var referenceHrefLabel = (0, _react.useMemo)(function () {
    // Backwards compatibility
    if (transformReferenceId) {
      var t = transformReferenceId(reference.file.path);
      return {
        href: t.href,
        label: t.text
      };
    }
    return {
      href: getHref === null || getHref === void 0 ? void 0 : getHref(reference),
      label: getLabel === null || getLabel === void 0 ? void 0 : getLabel(reference)
    };
  }, [transformReferenceId, getHref, reference, getLabel]);
  return <li key={referenceHrefLabel.href} className="MarkpromptReference" style={{
    animationDelay: "".concat(100 * index, "ms")
  }}>
      <a href={referenceHrefLabel.href} onClick={onDidSelectReference}>
        {referenceHrefLabel.label}
      </a>
    </li>;
};
var References = function References(props) {
  var getHref = props.getHref,
    getLabel = props.getLabel,
    _props$heading = props.heading,
    heading = _props$heading === void 0 ? _constants.DEFAULT_MARKPROMPT_OPTIONS.references.heading : _props$heading,
    _props$loadingText = props.loadingText,
    loadingText = _props$loadingText === void 0 ? _constants.DEFAULT_MARKPROMPT_OPTIONS.references.loadingText : _props$loadingText,
    transformReferenceId = props.transformReferenceId;
  var _useMarkpromptContext = (0, Markprompt.useMarkpromptContext)(),
    references = _useMarkpromptContext.references,
    state = _useMarkpromptContext.state;
  var _useElementSize = (0, _useElementSize3.useElementSize)(),
    _useElementSize2 = _slicedToArray(_useElementSize, 2),
    ref = _useElementSize2[0],
    height = _useElementSize2[1].height;
  var ReferenceComponent = (0, _react.useCallback)(function (props) {
    return <Reference getHref={getHref} getLabel={getLabel}
    // Backwards compatibility
    transformReferenceId={transformReferenceId} {...props} />;
  }, [transformReferenceId, getHref, getLabel]);
  var adjustedState = state;
  if (state === 'done' && references.length === 0) {
    adjustedState = 'indeterminate';
  }
  var _useSpring = (0, _web.useSpring)(function () {
      return {
        height: adjustedState === 'indeterminate' ? 0 : height,
        opacity: adjustedState === 'indeterminate' ? 0 : 1,
        y: adjustedState === 'indeterminate' ? '100%' : '0%'
      };
    }, [adjustedState, height]),
    _useSpring2 = _slicedToArray(_useSpring, 1),
    style = _useSpring2[0];
  return <_web.animated.div style={style}>
      <div ref={ref} className="MarkpromptReferences" data-loading-state={adjustedState} role="status">
        {state === 'preload' && <>
            <div className="MarkpromptProgress" id="markprompt-progressbar" role="progressbar" aria-labelledby="markprompt-loading-text" />
            <p id="markprompt-loading-text">{loadingText}</p>
          </>}

        {state !== 'preload' && <p>{heading}</p>}

        {(state === 'streaming-answer' || state === 'done') && <Markprompt.References ReferenceComponent={ReferenceComponent} />}
      </div>
    </_web.animated.div>;
};
exports.References = References;