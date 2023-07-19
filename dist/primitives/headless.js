import * as Dialog from "@radix-ui/react-dialog";
import debounce from "p-debounce";
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, } from "react";
import Markdown from "react-markdown";
import { mergeRefs } from "react-merge-refs";
import remarkGfm from "remark-gfm";
import { Footer } from "./footer.js";
import { ConditionalVisuallyHidden } from "../ConditionalWrap.js";
import { DEFAULT_MARKPROMPT_OPTIONS } from "../constants.js";
import { MarkpromptContext, useMarkpromptContext } from "../context.js";
import { useMarkprompt } from "../useMarkprompt.js";
/**
 * The Markprompt context provider and dialog root.
 */
function Root(props) {
    const { children, display = "dialog", defaultOpen, modal, onOpenChange, open, ...markpromptOptions } = props;
    if (!markpromptOptions.projectKey) {
        throw new Error("Markprompt: a project key is required. Make sure to pass the projectKey prop to Markprompt.Root.");
    }
    const contextValue = useMarkprompt(markpromptOptions);
    return (React.createElement(MarkpromptContext.Provider, { value: contextValue },
        display === "dialog" && (React.createElement(DialogRootWithAbort, { defaultOpen: defaultOpen, modal: modal, onOpenChange: onOpenChange, open: open }, children)),
        display === "plain" && children));
}
function DialogRootWithAbort(props) {
    const { onOpenChange, modal = true, ...rest } = props;
    const { abort } = useMarkpromptContext();
    const handleOpenChange = useCallback((open) => {
        if (!open)
            abort();
        if (onOpenChange)
            onOpenChange(open);
    }, [abort, onOpenChange]);
    return (React.createElement(Dialog.Root, { ...rest, modal: modal, onOpenChange: handleOpenChange }, props.children));
}
/**
 * A button to open the Markprompt dialog.
 */
const DialogTrigger = forwardRef((props, ref) => {
    return React.createElement(Dialog.Trigger, { ref: ref, ...props });
});
DialogTrigger.displayName = "Markprompt.DialogTrigger";
/**
 * The Markprompt dialog portal.
 */
function Portal(props) {
    return React.createElement(Dialog.Portal, { ...props });
}
Portal.displayName = "Markprompt.Portal";
/**
 * The Markprompt dialog overlay.
 */
const Overlay = forwardRef((props, ref) => {
    return React.createElement(Dialog.Overlay, { ref: ref, ...props });
});
Overlay.displayName = "Markprompt.Overlay";
/**
 * The Markprompt dialog content.
 */
const Content = forwardRef(function Content(props, ref) {
    const { showBranding = true, ...rest } = props;
    const { state, searchProvider } = useMarkpromptContext();
    return (React.createElement(Dialog.Content, { ...rest, ref: ref, "data-loading-state": state },
        props.children,
        showBranding && React.createElement(Footer, { includeAlgolia: searchProvider === "algolia" })));
});
Content.displayName = "Markprompt.Content";
/**
 * The Markprompt plain content.
 */
const PlainContent = forwardRef(function PlainContent(props, ref) {
    const { showBranding = true, ...rest } = props;
    const { state, searchProvider } = useMarkpromptContext();
    return (React.createElement("div", { ...rest, ref: ref, "data-loading-state": state },
        props.children,
        showBranding && (React.createElement(Footer, { includeAlgolia: searchProvider === "algolia" }))));
});
PlainContent.displayName = "Markprompt.PlainContent";
/**
 * A button to close the Markprompt dialog and abort an ongoing request.
 */
const Close = forwardRef(function Close(props, ref) {
    const { onClick, ...rest } = props;
    const { abort } = useMarkpromptContext();
    const handleClick = useCallback((event) => {
        // abort ongoing fetch requests on close
        abort();
        // call user-provided onClick handler
        if (onClick)
            onClick(event);
    }, [abort, onClick]);
    return React.createElement(Dialog.Close, { ...rest, ref: ref, onClick: handleClick });
});
Close.displayName = "Markprompt.Close";
const Title = forwardRef((props, ref) => {
    const { hide } = props;
    return (React.createElement(ConditionalVisuallyHidden, { hide: hide },
        React.createElement(Dialog.Title, { ...props, ref: ref })));
});
Title.displayName = "Markprompt.Title";
/**
 * A visually hidden aria description.
 */
const Description = forwardRef((props, ref) => {
    const { hide } = props;
    return (React.createElement(ConditionalVisuallyHidden, { hide: hide },
        React.createElement(Dialog.Description, { ...props, ref: ref })));
});
Description.displayName = "Markprompt.Description";
/**
 * A form which, when submitted, submits the current prompt.
 */
const Form = forwardRef(function Form(props, ref) {
    const { onSubmit, ...rest } = props;
    const { activeView, isSearchEnabled, submitPrompt, submitSearchQuery, prompt, } = useMarkpromptContext();
    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        // call user-provided onSubmit handler
        if (onSubmit) {
            onSubmit(event);
        }
        // submit search query if search is enabled
        if (isSearchEnabled && activeView === "search") {
            await submitSearchQuery(prompt);
        }
        else {
            // submit prompt if search is disabled
            await submitPrompt();
        }
    }, [
        activeView,
        isSearchEnabled,
        onSubmit,
        prompt,
        submitPrompt,
        submitSearchQuery,
    ]);
    return React.createElement("form", { ...rest, ref: ref, onSubmit: handleSubmit });
});
Form.displayName = "Markprompt.Form";
const name = "markprompt-prompt";
/**
 * The Markprompt input prompt. User input will update the prompt in the Markprompt context.
 */
const Prompt = forwardRef(function Prompt(props, ref) {
    const { autoCapitalize = "none", autoComplete = "off", autoCorrect = "off", autoFocus = true, label, labelClassName, onChange, placeholder = DEFAULT_MARKPROMPT_OPTIONS.prompt.placeholder, spellCheck = false, type = "search", ...rest } = props;
    const { activeView, prompt, searchQuery, submitSearchQuery, setPrompt, setSearchQuery, } = useMarkpromptContext();
    const debouncedSubmitSearchQuery = useMemo(() => debounce(submitSearchQuery, 220), [submitSearchQuery]);
    const handleChange = useCallback((event) => {
        const value = event.target.value;
        // We use the input value directly instead of using the prompt state
        // to avoid an off-by-one-bug when querying.
        if (activeView === "search") {
            setSearchQuery(value);
            debouncedSubmitSearchQuery(value);
        }
        if (activeView === "prompt") {
            setPrompt(value);
        }
        if (onChange) {
            onChange(event);
        }
    }, [
        activeView,
        onChange,
        setSearchQuery,
        debouncedSubmitSearchQuery,
        setPrompt,
    ]);
    return (React.createElement(React.Fragment, null,
        React.createElement("label", { htmlFor: name, className: labelClassName }, label),
        React.createElement("input", { ...rest, id: name, type: type, name: name, placeholder: placeholder, ref: ref, value: activeView === "search" ? searchQuery : prompt, onChange: handleChange, autoCapitalize: autoCapitalize, autoComplete: autoComplete, autoCorrect: autoCorrect, autoFocus: autoFocus, spellCheck: spellCheck })));
});
Prompt.displayName = "Markprompt.Prompt";
/**
 * Render the markdown answer from the Markprompt API.
 */
function Answer(props) {
    const { remarkPlugins = [remarkGfm], ...rest } = props;
    const { answer } = useMarkpromptContext();
    return (React.createElement(Markdown, { ...rest, remarkPlugins: remarkPlugins }, answer !== undefined && answer != null ? answer : ""));
}
Answer.displayName = "Markprompt.Answer";
/**
 * A component automatically that scrolls to the bottom.
 */
const AutoScroller = forwardRef((props, ref) => {
    const { autoScroll = true, scrollBehavior = "smooth" } = props;
    const localRef = useRef(null);
    const { answer, state } = useMarkpromptContext();
    useEffect(() => {
        if (!localRef.current)
            return;
        if (!autoScroll)
            return;
        localRef.current.scrollTo({
            top: localRef.current.scrollHeight,
            behavior: scrollBehavior,
        });
    }, [answer, state, autoScroll, scrollBehavior]);
    return React.createElement("div", { ref: mergeRefs([ref, localRef]), ...props });
});
AutoScroller.displayName = "Markprompt.AutoScroller";
/**
 * Render the references that Markprompt returns.
 */
const References = function References(props, ref) {
    const { RootComponent = "ul", ReferenceComponent = "li" } = props;
    const { references } = useMarkpromptContext();
    return (React.createElement(RootComponent, { ref: ref }, references.map((reference, index) => {
        return (React.createElement(ReferenceComponent, { key: `${reference.file.path}-${index}`, reference: reference, index: index }));
    })));
};
/**
 * Render the references that Markprompr returned.
 */
const ForwardedReferences = forwardRef(References);
ForwardedReferences.displayName = "Markprompt.References";
const SearchResults = forwardRef((props, ref) => {
    const { as: Component = "ul", label = "Search results", SearchResultComponent = SearchResult, ...rest } = props;
    const { searchResults } = useMarkpromptContext();
    return (React.createElement(Component, { ...rest, ref: ref, role: "listbox", id: "markprompt-search-results", tabIndex: 0, "aria-label": label }, searchResults.map((result, index) => {
        const id = `markprompt-result-${index}`;
        return (React.createElement(SearchResultComponent, { role: "option", index: index, id: id, key: `${result.href}:${result.title}`, ...result }));
    })));
});
SearchResults.displayName = "Markprompt.SearchResults";
const SearchResult = forwardRef((props, ref) => {
    const { title, href, ...rest } = props;
    return (React.createElement("li", { ref: ref, ...rest },
        React.createElement("a", { href: href }, title)));
});
SearchResult.displayName = "Markprompt.SearchResult";
export { Answer, AutoScroller, Close, Content, Description, DialogTrigger, Form, Overlay, PlainContent, Portal, Prompt, ForwardedReferences as References, Root, SearchResult, SearchResults, Title, };
//# sourceMappingURL=headless.js.map