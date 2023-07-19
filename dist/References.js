import { animated, useSpring } from '@react-spring/web';
import React, { useCallback, useMemo } from 'react';
import { DEFAULT_MARKPROMPT_OPTIONS } from './constants.js';
import * as Markprompt from './index.js';
import { useMarkpromptContext } from './index.js';
import { useElementSize } from './useElementSize.js';
const Reference = (props) => {
    const { getHref = DEFAULT_MARKPROMPT_OPTIONS.references.getHref, getLabel = DEFAULT_MARKPROMPT_OPTIONS.references.getLabel, index, reference, transformReferenceId, onDidSelectReference, } = props;
    const referenceHrefLabel = useMemo(() => {
        // Backwards compatibility
        if (transformReferenceId) {
            const t = transformReferenceId(reference.file.path);
            return { href: t.href, label: t.text };
        }
        return {
            href: getHref?.(reference),
            label: getLabel?.(reference),
        };
    }, [transformReferenceId, getHref, reference, getLabel]);
    return (React.createElement("li", { key: referenceHrefLabel.href, className: "MarkpromptReference", style: {
            animationDelay: `${100 * index}ms`,
        } },
        React.createElement("a", { href: referenceHrefLabel.href, onClick: onDidSelectReference }, referenceHrefLabel.label)));
};
const References = (props) => {
    const { getHref, getLabel, heading = DEFAULT_MARKPROMPT_OPTIONS.references.heading, loadingText = DEFAULT_MARKPROMPT_OPTIONS.references.loadingText, transformReferenceId, } = props;
    const { references, state } = useMarkpromptContext();
    const [ref, { height }] = useElementSize();
    const ReferenceComponent = useCallback((props) => (React.createElement(Reference, { getHref: getHref, getLabel: getLabel, 
        // Backwards compatibility
        transformReferenceId: transformReferenceId, ...props })), [transformReferenceId, getHref, getLabel]);
    let adjustedState = state;
    if (state === 'done' && references.length === 0) {
        adjustedState = 'indeterminate';
    }
    const [style] = useSpring(() => ({
        height: adjustedState === 'indeterminate' ? 0 : height,
        opacity: adjustedState === 'indeterminate' ? 0 : 1,
        y: adjustedState === 'indeterminate' ? '100%' : '0%',
    }), [adjustedState, height]);
    return (React.createElement(animated.div, { style: style },
        React.createElement("div", { ref: ref, className: "MarkpromptReferences", "data-loading-state": adjustedState, role: "status" },
            state === 'preload' && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "MarkpromptProgress", id: "markprompt-progressbar", role: "progressbar", "aria-labelledby": "markprompt-loading-text" }),
                React.createElement("p", { id: "markprompt-loading-text" }, loadingText))),
            state !== 'preload' && React.createElement("p", null, heading),
            (state === 'streaming-answer' || state === 'done') && (React.createElement(Markprompt.References, { ReferenceComponent: ReferenceComponent })))));
};
export { References };
//# sourceMappingURL=References.js.map