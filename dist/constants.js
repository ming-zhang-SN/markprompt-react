import { DEFAULT_SUBMIT_PROMPT_OPTIONS, DEFAULT_SUBMIT_SEARCH_QUERY_OPTIONS, } from '@markprompt/core';
const removeFileExtension = (fileName) => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
        return fileName;
    }
    return fileName.substring(0, lastDotIndex);
};
const pathToHref = (path) => {
    const lastDotIndex = path.lastIndexOf('.');
    let cleanPath = path;
    if (lastDotIndex >= 0) {
        cleanPath = path.substring(0, lastDotIndex);
    }
    if (cleanPath.endsWith('/index')) {
        cleanPath = cleanPath.replace(/\/index/gi, '');
    }
    return cleanPath;
};
function trimContent(text) {
    // we don't use String.prototype.trim() because we
    // don't want to remove line terminators from Markdown
    return text.trimStart().trimEnd();
}
function removeLeadHeading(text, heading) {
    // This needs to be revised. When returning the search result, the endpoint
    // provides a snippet of the content around the search term (to avoid sending
    // entire sections). This snippet may contain the start of the section
    // content, and this content may start with a heading (the leadHeading).
    // We don't want this leadHeading to be part of the content snippet.
    // Since it's a snippet, we can't assume that the leadHeading will always be
    // the first line. Instead, we have to check it in the string itself.
    const trimmedContent = trimContent(text);
    if (!heading) {
        return trimmedContent;
    }
    const pattern = new RegExp(`^#{1,}\\s${heading}\\s?`);
    return trimContent(trimmedContent.replace(pattern, ''));
}
function createKWICSnippet(content, normalizedSearchQuery) {
    const trimmedContent = content.trim().replace(/\n/g, ' ');
    const index = trimmedContent
        .toLocaleLowerCase()
        .indexOf(normalizedSearchQuery);
    if (index === -1) {
        return trimmedContent.slice(0, 200);
    }
    const rawSnippet = trimmedContent.slice(Math.max(0, index - 50), index + 150);
    const words = rawSnippet.split(/\s+/);
    if (words.length > 3) {
        return words.slice(1, words.length - 1).join(' ');
    }
    return words.join(' ');
}
const defaultPromptGetLabel = (reference) => {
    return (reference.meta?.leadHeading?.value ||
        reference.file?.title ||
        removeFileExtension(reference.file.path.split('/').slice(-1)[0]));
};
const defaultGetHref = (result) => {
    if (result.url) {
        return result.url;
    }
    const reference = result;
    const path = pathToHref(reference.file.path);
    if (reference.meta?.leadHeading?.id) {
        return `${path}#${reference.meta.leadHeading.id}`;
    }
    else if (reference.meta?.leadHeading?.value) {
        return `${path}#${reference.meta.leadHeading.slug}`;
    }
    return path;
};
const defaultGetSearchResultHeading = (result) => {
    if (result.hierarchy) {
        return result.hierarchy.lvl0 || undefined;
    }
    const res = result;
    if (res.matchType === 'title') {
        return undefined;
    }
    else {
        const leadHeading = res.meta?.leadHeading;
        if (res.matchType === 'leadHeading' && leadHeading?.value) {
            return res.file.title;
        }
        else {
            return leadHeading?.value || res.file.title;
        }
    }
};
const defaultGetSearchResultTitle = (result, query) => {
    if (result.hierarchy) {
        return result.hierarchy.lvl1 || undefined;
    }
    const res = result;
    if (res.matchType === 'title') {
        return res.file.title;
    }
    else {
        const leadHeading = res.meta?.leadHeading;
        if (res.matchType === 'leadHeading' && leadHeading?.value) {
            return leadHeading.value;
        }
        else {
            // return removeLeadHeading(res.snippet || '', leadHeading?.value);
            const normalizedSearchQuery = query.toLowerCase();
            // Fast and hacky way to remove the lead heading from
            // the content, which we don't want to be part of the snippet.
            const trimmedContent = removeLeadHeading(res.snippet || '', res.meta?.leadHeading?.value);
            return createKWICSnippet(trimmedContent, normalizedSearchQuery);
        }
    }
};
const defaultGetSearchResultSubtitle = (result) => {
    if (result.hierarchy) {
        return result.hierarchy.lvl2 || undefined;
    }
    return undefined;
};
export const DEFAULT_MARKPROMPT_OPTIONS = {
    display: 'dialog',
    close: {
        label: 'Close Markprompt',
        visible: true,
    },
    description: {
        hide: true,
        text: 'Markprompt',
    },
    feedback: {
        enabled: false,
        heading: 'Was this response helpful?',
        confirmationMessage: 'Thank you!',
    },
    prompt: {
        ...DEFAULT_SUBMIT_PROMPT_OPTIONS,
        label: 'Ask AI',
        tabLabel: 'Ask AI',
        placeholder: 'Ask AI…',
    },
    references: {
        loadingText: 'Fetching relevant pages…',
        heading: 'Answer generated from the following sources:',
        getHref: defaultGetHref,
        getLabel: defaultPromptGetLabel,
    },
    search: {
        ...DEFAULT_SUBMIT_SEARCH_QUERY_OPTIONS,
        enabled: false,
        getHref: defaultGetHref,
        getHeading: defaultGetSearchResultHeading,
        getTitle: defaultGetSearchResultTitle,
        getSubtitle: defaultGetSearchResultSubtitle,
        label: 'Search docs…',
        tabLabel: 'Search',
        placeholder: 'Search docs…',
    },
    trigger: {
        label: 'Open Markprompt',
        placeholder: 'Ask docs',
        floating: true,
        customElement: false,
    },
    title: {
        hide: true,
        text: 'Ask AI',
    },
    showBranding: true,
};
//# sourceMappingURL=constants.js.map