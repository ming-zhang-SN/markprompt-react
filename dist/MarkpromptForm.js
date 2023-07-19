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
  return <BaseMarkprompt.Form className="MarkpromptForm">
      <BaseMarkprompt.Prompt {...inputProps} ref={inputRef} className="MarkpromptPrompt" placeholder={placeholder} labelClassName="MarkpromptPromptLabel" label={<AccessibleIcon.Root label={label}>
            {icon === "search" ? <_icons.SearchIcon className="MarkpromptSearchIcon" /> : <_icons.SparklesIcon className="MarkpromptSearchIcon" />}
          </AccessibleIcon.Root>} />
      {close && close.visible !== false && <BaseMarkprompt.Close className="MarkpromptClose">
          <AccessibleIcon.Root label={(close === null || close === void 0 ? void 0 : close.label) !== undefined && (close === null || close === void 0 ? void 0 : close.label) != null ? close === null || close === void 0 ? void 0 : close.label : _constants.DEFAULT_MARKPROMPT_OPTIONS.close.label}>
            <kbd>Esc</kbd>
          </AccessibleIcon.Root>
        </BaseMarkprompt.Close>}
    </BaseMarkprompt.Form>;
}