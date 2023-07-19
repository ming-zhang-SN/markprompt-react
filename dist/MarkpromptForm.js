import * as AccessibleIcon from "@radix-ui/react-accessible-icon";
import React, { useRef, useEffect, } from "react";
import { DEFAULT_MARKPROMPT_OPTIONS } from "./constants.js";
import { useMarkpromptContext } from "./context.js";
import { SearchIcon, SparklesIcon } from "./icons.js";
import * as BaseMarkprompt from "./primitives/headless.js";
export function MarkpromptForm(props) {
    const { inputProps, label, placeholder, icon, close } = props;
    const { activeView } = useMarkpromptContext();
    const inputRef = useRef(null);
    useEffect(() => {
        // Bring form input in focus when activeView changes.
        inputRef.current?.focus();
    }, [activeView]);
    return (React.createElement(BaseMarkprompt.Form, { className: "MarkpromptForm" },
        React.createElement(BaseMarkprompt.Prompt, { ...inputProps, ref: inputRef, className: "MarkpromptPrompt", placeholder: placeholder, labelClassName: "MarkpromptPromptLabel", label: React.createElement(AccessibleIcon.Root, { label: label }, icon === "search" ? (React.createElement(SearchIcon, { className: "MarkpromptSearchIcon" })) : (React.createElement(SparklesIcon, { className: "MarkpromptSearchIcon" }))) }),
        close && close.visible !== false && (React.createElement(BaseMarkprompt.Close, { className: "MarkpromptClose" },
            React.createElement(AccessibleIcon.Root, { label: close?.label !== undefined && close?.label != null
                    ? close?.label
                    : DEFAULT_MARKPROMPT_OPTIONS.close.label },
                React.createElement("kbd", null, "Esc"))))));
}
//# sourceMappingURL=MarkpromptForm.js.map