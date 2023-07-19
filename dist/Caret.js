import React, {} from 'react';
import { useMarkpromptContext } from './index.js';
export const Caret = () => {
    const { answer } = useMarkpromptContext();
    if (answer) {
        return null;
    }
    return React.createElement("span", { className: "MarkpromptCaret" });
};
//# sourceMappingURL=Caret.js.map