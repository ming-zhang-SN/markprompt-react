"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Markprompt = Markprompt;
exports.openMarkprompt = openMarkprompt;
var AccessibleIcon = _interopRequireWildcard(require("@radix-ui/react-accessible-icon"));
var _clsx = require("clsx");
var _emittery = _interopRequireDefault(require("emittery"));
var _react = _interopRequireWildcard(require("react"));
var _constants = require("./constants.js");
var _context = require("./context.js");
var _icons = require("./icons.js");
var BaseMarkprompt = _interopRequireWildcard(require("./primitives/headless.js"));
var _PromptView = require("./PromptView.js");
var _SearchBoxTrigger = require("./SearchBoxTrigger.js");
var _SearchView = require("./SearchView.js");
var _excluded = ["close", "debug", "description", "display", "projectKey", "prompt", "references", "search", "showBranding", "title", "trigger", "onDidRequestOpenChange"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var emitter = new _emittery["default"]();

/**
 * Open Markprompt programmatically. Useful for building a custom trigger
 * or opening the Markprompt dialog in response to other user actions.
 */
function openMarkprompt() {
  emitter.emit("open");
}
function Markprompt(props) {
  var close = props.close,
    debug = props.debug,
    description = props.description,
    _props$display = props.display,
    display = _props$display === void 0 ? "dialog" : _props$display,
    projectKey = props.projectKey,
    prompt = props.prompt,
    references = props.references,
    search = props.search,
    showBranding = props.showBranding,
    title = props.title,
    trigger = props.trigger,
    onDidRequestOpenChange = props.onDidRequestOpenChange,
    dialogProps = _objectWithoutProperties(props, _excluded);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  (0, _react.useEffect)(function () {
    var onOpen = function onOpen() {
      onDidRequestOpenChange === null || onDidRequestOpenChange === void 0 ? void 0 : onDidRequestOpenChange(true);
      if (display === "dialog") {
        setOpen(true);
      }
    };
    var onClose = function onClose() {
      onDidRequestOpenChange === null || onDidRequestOpenChange === void 0 ? void 0 : onDidRequestOpenChange(false);
      if (display === "dialog") {
        setOpen(false);
      }
    };
    emitter.on("open", onOpen);
    emitter.on("close", onClose);
    return function () {
      emitter.off("open", onOpen);
      emitter.off("close", onClose);
    };
  }, [trigger === null || trigger === void 0 ? void 0 : trigger.customElement, display, onDidRequestOpenChange]);
  return <BaseMarkprompt.Root projectKey={projectKey} display={display} promptOptions={prompt} searchOptions={search} open={open} onOpenChange={setOpen} debug={debug} {...dialogProps}>
      {!(trigger !== null && trigger !== void 0 && trigger.customElement) && display === "dialog" && <>
          {(trigger === null || trigger === void 0 ? void 0 : trigger.floating) !== false ? <BaseMarkprompt.DialogTrigger className="MarkpromptFloatingTrigger">
              <AccessibleIcon.Root label={(trigger === null || trigger === void 0 ? void 0 : trigger.label) !== undefined && (trigger === null || trigger === void 0 ? void 0 : trigger.label) !== null ? trigger === null || trigger === void 0 ? void 0 : trigger.label : _constants.DEFAULT_MARKPROMPT_OPTIONS.trigger.label}>
                <_icons.ChatIcon className="MarkpromptChatIcon" width="24" height="24" />
              </AccessibleIcon.Root>
            </BaseMarkprompt.DialogTrigger> : <_SearchBoxTrigger.SearchBoxTrigger trigger={trigger} setOpen={setOpen} open={open} />}
        </>}

      {display === "dialog" && <>
          <BaseMarkprompt.Portal>
            <BaseMarkprompt.Overlay className="MarkpromptOverlay" />
            <BaseMarkprompt.Content className="MarkpromptContentDialog" showBranding={showBranding}>
              <BaseMarkprompt.Title hide={(title === null || title === void 0 ? void 0 : title.hide) !== undefined && (title === null || title === void 0 ? void 0 : title.hide) != null ? title === null || title === void 0 ? void 0 : title.hide : true}>
                {(title === null || title === void 0 ? void 0 : title.text) !== undefined && (title === null || title === void 0 ? void 0 : title.text) != null ? title === null || title === void 0 ? void 0 : title.text : _constants.DEFAULT_MARKPROMPT_OPTIONS.prompt.label}
              </BaseMarkprompt.Title>

              {(description === null || description === void 0 ? void 0 : description.text) && <BaseMarkprompt.Description hide={(description === null || description === void 0 ? void 0 : description.hide) !== undefined && (description === null || description === void 0 ? void 0 : description.hide) != null ? description === null || description === void 0 ? void 0 : description.hide : true}>
                  {description === null || description === void 0 ? void 0 : description.text}
                </BaseMarkprompt.Description>}

              <MarkpromptContent prompt={prompt} references={references} search={search} close={close} />
            </BaseMarkprompt.Content>
          </BaseMarkprompt.Portal>
        </>}

      {display === "plain" && <BaseMarkprompt.PlainContent className="MarkpromptContentPlain" showBranding={showBranding}>
          <MarkpromptContent prompt={prompt} search={search} references={references} close={close} />
        </BaseMarkprompt.PlainContent>}
    </BaseMarkprompt.Root>;
}
function MarkpromptContent(props) {
  var prompt = props.prompt,
    references = props.references,
    search = props.search,
    _close = props.close;
  var _useMarkpromptContext = (0, _context.useMarkpromptContext)(),
    abort = _useMarkpromptContext.abort,
    activeView = _useMarkpromptContext.activeView,
    setActiveView = _useMarkpromptContext.setActiveView;
  (0, _react.useEffect)(function () {
    var handleKeyDown = function handleKeyDown(event) {
      if (event.key === "Enter" && event.ctrlKey || event.key === "Enter" && event.metaKey) {
        event.preventDefault();
        if (activeView === "prompt") {
          setActiveView("search");
        } else if (activeView === "search") {
          setActiveView("prompt");
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeView, setActiveView]);
  var close = (0, _react.useMemo)(function () {
    return _close !== undefined && _close != null ? _close : _constants.DEFAULT_MARKPROMPT_OPTIONS.close;
  }, [_close]);
  return <div className="MarkpromptTabsContainer">
      {search !== null && search !== void 0 && search.enabled ? <div style={{
      position: "relative"
    }}>
          <div className="MarkpromptTabsList">
            <button aria-label={search.tabLabel} className="MarkpromptTab" data-state={activeView === "search" ? "active" : ""} onClick={function () {
          abort();
          setActiveView("search");
        }}>
              {search.tabLabel || _constants.DEFAULT_MARKPROMPT_OPTIONS.search.tabLabel}
            </button>
            <button className="MarkpromptTab" data-state={activeView === "prompt" ? "active" : ""} onClick={function () {
          abort();
          setActiveView("prompt");
        }}>
              <_icons.SparklesIcon focusable={false} className={(0, _clsx.clsx)("MarkpromptBaseIcon", {
            MarkpromptPrimaryIcon: activeView === "prompt",
            MarkpromptHighlightedIcon: activeView === "search"
          })} />
              {(prompt === null || prompt === void 0 ? void 0 : prompt.tabLabel) || _constants.DEFAULT_MARKPROMPT_OPTIONS.prompt.tabLabel}
            </button>
          </div>
          {/* Add close button in the tab bar */}
          {(close === null || close === void 0 ? void 0 : close.visible) !== false && <div style={{
        position: "absolute",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        right: "0.75rem",
        top: "0rem",
        bottom: "0rem"
      }}>
              <BaseMarkprompt.Close className="MarkpromptClose">
                <AccessibleIcon.Root label={(close === null || close === void 0 ? void 0 : close.label) !== undefined && (close === null || close === void 0 ? void 0 : close.label) != null ? close === null || close === void 0 ? void 0 : close.label : _constants.DEFAULT_MARKPROMPT_OPTIONS.close.label}>
                  <kbd>Esc</kbd>
                </AccessibleIcon.Root>
              </BaseMarkprompt.Close>
            </div>}
        </div> :
    // We still include a div to preserve the grid-template-rows rules
    <div />}
      <div className="MarkpromptViews">
        <div style={{
        position: "absolute",
        inset: 0,
        display: activeView === "search" ? "block" : "none"
      }}>
          <_SearchView.SearchView handleViewChange={function () {
          return setActiveView("prompt");
        }} search={search} close={!(search !== null && search !== void 0 && search.enabled) ? close : undefined} onDidSelectResult={function () {
          return emitter.emit("close");
        }} />
        </div>
        <div style={{
        position: "absolute",
        inset: 0,
        display: activeView === "prompt" ? "block" : "none"
      }}>
          <_PromptView.PromptView prompt={prompt} references={references} close={!(search !== null && search !== void 0 && search.enabled) ? close : undefined} onDidSelectReference={function () {
          return emitter.emit("close");
        }} />
        </div>
      </div>
    </div>;
}