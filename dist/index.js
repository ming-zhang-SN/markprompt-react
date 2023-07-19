"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useMarkprompt: true,
  Answer: true,
  AutoScroller: true,
  Close: true,
  Content: true,
  PlainContent: true,
  Description: true,
  DialogTrigger: true,
  Form: true,
  Overlay: true,
  Portal: true,
  Prompt: true,
  References: true,
  Root: true,
  SearchResult: true,
  SearchResults: true,
  Title: true,
  Markprompt: true,
  openMarkprompt: true,
  useMarkpromptContext: true,
  DEFAULT_MARKPROMPT_OPTIONS: true
};
Object.defineProperty(exports, "Answer", {
  enumerable: true,
  get: function get() {
    return _headless.Answer;
  }
});
Object.defineProperty(exports, "AutoScroller", {
  enumerable: true,
  get: function get() {
    return _headless.AutoScroller;
  }
});
Object.defineProperty(exports, "Close", {
  enumerable: true,
  get: function get() {
    return _headless.Close;
  }
});
Object.defineProperty(exports, "Content", {
  enumerable: true,
  get: function get() {
    return _headless.Content;
  }
});
Object.defineProperty(exports, "DEFAULT_MARKPROMPT_OPTIONS", {
  enumerable: true,
  get: function get() {
    return _constants.DEFAULT_MARKPROMPT_OPTIONS;
  }
});
Object.defineProperty(exports, "Description", {
  enumerable: true,
  get: function get() {
    return _headless.Description;
  }
});
Object.defineProperty(exports, "DialogTrigger", {
  enumerable: true,
  get: function get() {
    return _headless.DialogTrigger;
  }
});
Object.defineProperty(exports, "Form", {
  enumerable: true,
  get: function get() {
    return _headless.Form;
  }
});
Object.defineProperty(exports, "Markprompt", {
  enumerable: true,
  get: function get() {
    return _Markprompt.Markprompt;
  }
});
Object.defineProperty(exports, "Overlay", {
  enumerable: true,
  get: function get() {
    return _headless.Overlay;
  }
});
Object.defineProperty(exports, "PlainContent", {
  enumerable: true,
  get: function get() {
    return _headless.PlainContent;
  }
});
Object.defineProperty(exports, "Portal", {
  enumerable: true,
  get: function get() {
    return _headless.Portal;
  }
});
Object.defineProperty(exports, "Prompt", {
  enumerable: true,
  get: function get() {
    return _headless.Prompt;
  }
});
Object.defineProperty(exports, "References", {
  enumerable: true,
  get: function get() {
    return _headless.References;
  }
});
Object.defineProperty(exports, "Root", {
  enumerable: true,
  get: function get() {
    return _headless.Root;
  }
});
Object.defineProperty(exports, "SearchResult", {
  enumerable: true,
  get: function get() {
    return _headless.SearchResult;
  }
});
Object.defineProperty(exports, "SearchResults", {
  enumerable: true,
  get: function get() {
    return _headless.SearchResults;
  }
});
Object.defineProperty(exports, "Title", {
  enumerable: true,
  get: function get() {
    return _headless.Title;
  }
});
Object.defineProperty(exports, "openMarkprompt", {
  enumerable: true,
  get: function get() {
    return _Markprompt.openMarkprompt;
  }
});
Object.defineProperty(exports, "useMarkprompt", {
  enumerable: true,
  get: function get() {
    return _useMarkprompt.useMarkprompt;
  }
});
Object.defineProperty(exports, "useMarkpromptContext", {
  enumerable: true,
  get: function get() {
    return _context.useMarkpromptContext;
  }
});
var _useMarkprompt = require("./useMarkprompt.js");
var _headless = require("./primitives/headless.js");
var _Markprompt = require("./Markprompt.js");
var _context = require("./context.js");
var _constants = require("./constants.js");
var _types = require("./types.js");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});