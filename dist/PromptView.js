import React, { useMemo, useCallback, } from "react";
import { Answer } from "./Answer.js";
import { DEFAULT_MARKPROMPT_OPTIONS } from "./constants.js";
import { MarkpromptForm } from "./MarkpromptForm.js";
import * as BaseMarkprompt from "./primitives/headless.js";
import { References } from "./References.js";
import {} from "./types.js";
export function PromptView(props) {
    const { prompt, references, close, onDidSelectReference } = props;
    return (React.createElement("div", { className: "MarkpromptPromptView" },
        React.createElement(MarkpromptForm, { label: prompt?.label !== undefined && prompt?.label != null
                ? prompt?.label
                : DEFAULT_MARKPROMPT_OPTIONS.prompt.label, placeholder: prompt?.placeholder !== undefined && prompt?.placeholder != null
                ? prompt?.placeholder
                : DEFAULT_MARKPROMPT_OPTIONS.prompt.placeholder, icon: "prompt", close: close }),
        React.createElement(AnswerContainer, { references: references, onDidSelectReference: onDidSelectReference })));
}
function AnswerContainer({ references, onDidSelectReference, }) {
    return (React.createElement("div", { className: "MarkpromptAnswerContainer" },
        React.createElement(BaseMarkprompt.AutoScroller, { className: "MarkpromptAutoScroller" },
            React.createElement(Answer, null)),
        React.createElement(References, { loadingText: references?.loadingText, transformReferenceId: references?.transformReferenceId, getLabel: references?.getLabel, getHref: references?.getHref, onDidSelectReference: onDidSelectReference })));
}
//# sourceMappingURL=PromptView.js.map