import React, { Fragment, forwardRef, memo } from 'react';
import { DEFAULT_MARKPROMPT_OPTIONS } from './constants.js';
import { FileTextIcon, HashIcon } from './icons.js';
import { useMarkpromptContext } from './index.js';
// Source: https://github.com/shuding/nextra/blob/main/packages/nextra-theme-docs/src/components/highlight-matches.tsx
const HighlightMatches = memo(function HighlightMatches({ value, match, }) {
    if (!match || match === '')
        return React.createElement(React.Fragment, null, value);
    const splitText = value ? value.split('') : [];
    const escapedSearch = match.trim().replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    const regexp = RegExp('(' + escapedSearch.replaceAll(' ', '|') + ')', 'ig');
    let result;
    let id = 0;
    let index = 0;
    const res = [];
    if (value) {
        while ((result = regexp.exec(value)) !== null) {
            res.push(React.createElement(Fragment, { key: id++ },
                splitText.splice(0, result.index - index).join(''),
                React.createElement("span", { className: "MarkpromptMatch" }, splitText.splice(0, regexp.lastIndex - result.index).join(''))));
            index = regexp.lastIndex;
        }
    }
    return (React.createElement(React.Fragment, null,
        res,
        splitText.join('')));
});
const SearchResult = forwardRef((props, ref) => {
    const { href, title, heading, subtitle, onMouseMove, onClick, ...rest } = props;
    const { searchQuery } = useMarkpromptContext();
    return (React.createElement("li", { ...rest, ref: ref, className: "MarkpromptSearchResult" },
        React.createElement("a", { href: href, className: "MarkpromptSearchResultLink", onMouseMove: onMouseMove, onClick: onClick },
            React.createElement("div", { className: "MarkpromptSearchResultContainer" },
                React.createElement("div", { className: "MarkpromptSearchResultIconWrapper MarkpromptSearchResultIconWrapperBordered" }, href?.includes('#') ? (React.createElement(HashIcon, { className: "MarkpromptSearchResultIcon" })) : (React.createElement(FileTextIcon, { className: "MarkpromptSearchResultIcon" }))),
                React.createElement("div", { className: "MarkpromptSearchResultContentWrapper" },
                    heading && (React.createElement("div", { className: "MarkpromptSearchResultHeading" },
                        React.createElement(HighlightMatches, { value: heading, match: searchQuery }))),
                    React.createElement("div", { className: "MarkpromptSearchResultTitle" },
                        React.createElement(HighlightMatches, { value: title, match: searchQuery })),
                    subtitle && (React.createElement("div", { className: "MarkpromptSearchResultSubtitle" },
                        React.createElement(HighlightMatches, { value: subtitle, match: searchQuery }))))))));
});
SearchResult.displayName = 'Markprompt.SearchResult';
export { SearchResult };
//# sourceMappingURL=SearchResult.js.map