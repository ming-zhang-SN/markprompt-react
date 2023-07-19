import React, {} from 'react';
import { Caret } from './Caret.js';
import * as BaseMarkprompt from './index.js';
import { useMarkpromptContext } from './index.js';
export function Answer() {
    const { state } = useMarkpromptContext();
    return (React.createElement("div", { className: "MarkpromptAnswer", "aria-describedby": "markprompt-progressbar", "aria-busy": state === 'preload' || state === 'streaming-answer', "aria-live": "polite" },
        React.createElement(Caret, null),
        React.createElement(BaseMarkprompt.Answer, null)));
}
//# sourceMappingURL=Answer.js.map