import React, { useState, } from 'react';
import { DEFAULT_MARKPROMPT_OPTIONS } from './constants.js';
import { useMarkpromptContext } from './context.js';
import { ThumbsDownIcon, ThumbsUpIcon } from './icons.js';
export function Feedback(props) {
    const { heading = DEFAULT_MARKPROMPT_OPTIONS.feedback.heading, confirmationMessage = DEFAULT_MARKPROMPT_OPTIONS.feedback
        .confirmationMessage, } = props;
    const { submitFeedback } = useMarkpromptContext();
    const [feedback, setFeedback] = useState();
    async function handleFeedback(helpful) {
        await submitFeedback(helpful);
        setFeedback(helpful);
    }
    return (React.createElement("aside", { ...props },
        React.createElement("h3", null, heading),
        typeof feedback !== 'boolean' && (React.createElement("div", null,
            React.createElement("button", { "aria-label": "Yes", onClick: () => handleFeedback(true) },
                React.createElement(ThumbsUpIcon, { width: 16, height: 16 })),
            React.createElement("button", { "aria-label": "No", onClick: () => handleFeedback(false) },
                React.createElement(ThumbsDownIcon, { width: 16, height: 16 })))),
        typeof feedback === 'boolean' && React.createElement("p", null, confirmationMessage)));
}
//# sourceMappingURL=Feedback.js.map