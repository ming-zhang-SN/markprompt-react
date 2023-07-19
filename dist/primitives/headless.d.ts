import type { FileSectionReference } from "@markprompt/core";
import * as Dialog from "@radix-ui/react-dialog";
import React, { type ComponentPropsWithRef, type ComponentPropsWithoutRef, type ElementType, type ReactElement, type ReactNode } from "react";
import Markdown from "react-markdown";
import type { PolymorphicComponentPropWithRef, SearchResultComponentProps } from "../types.js";
import { type UseMarkpromptOptions } from "../useMarkprompt.js";
type RootProps = Dialog.DialogProps & UseMarkpromptOptions;
/**
 * The Markprompt context provider and dialog root.
 */
declare function Root(props: RootProps): ReactElement;
type DialogTriggerProps = ComponentPropsWithRef<typeof Dialog.Trigger>;
/**
 * A button to open the Markprompt dialog.
 */
declare const DialogTrigger: React.ForwardRefExoticComponent<Omit<Dialog.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
type PortalProps = ComponentPropsWithoutRef<typeof Dialog.Portal>;
/**
 * The Markprompt dialog portal.
 */
declare function Portal(props: PortalProps): ReactElement;
declare namespace Portal {
    var displayName: string;
}
type OverlayProps = ComponentPropsWithRef<typeof Dialog.Overlay>;
/**
 * The Markprompt dialog overlay.
 */
declare const Overlay: React.ForwardRefExoticComponent<Omit<Dialog.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type ContentProps = ComponentPropsWithRef<typeof Dialog.Content> & {
    /**
     * Show the Markprompt footer.
     */
    showBranding?: boolean;
};
/**
 * The Markprompt dialog content.
 */
declare const Content: React.ForwardRefExoticComponent<Omit<ContentProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
type PlainContentProps = ComponentPropsWithRef<"div"> & {
    /**
     * Show the Markprompt footer.
     */
    showBranding?: boolean;
};
/**
 * The Markprompt plain content.
 */
declare const PlainContent: React.ForwardRefExoticComponent<Omit<PlainContentProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
type CloseProps = ComponentPropsWithRef<typeof Dialog.Close>;
/**
 * A button to close the Markprompt dialog and abort an ongoing request.
 */
declare const Close: React.ForwardRefExoticComponent<Omit<Dialog.DialogCloseProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
type TitleProps = ComponentPropsWithRef<typeof Dialog.Title> & {
    hide?: boolean;
};
declare const Title: React.ForwardRefExoticComponent<Omit<TitleProps, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
type DescriptionProps = ComponentPropsWithRef<typeof Dialog.Description> & {
    hide?: boolean;
};
/**
 * A visually hidden aria description.
 */
declare const Description: React.ForwardRefExoticComponent<Omit<DescriptionProps, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
type FormProps = ComponentPropsWithRef<"form">;
/**
 * A form which, when submitted, submits the current prompt.
 */
declare const Form: React.ForwardRefExoticComponent<Omit<Omit<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "ref"> & {
    ref?: ((instance: HTMLFormElement | null) => void) | React.RefObject<HTMLFormElement> | null | undefined;
}, "ref"> & React.RefAttributes<HTMLFormElement>>;
type PromptProps = ComponentPropsWithRef<"input"> & {
    /** The label for the input. */
    label?: ReactNode;
    /** The class name of the label element. */
    labelClassName?: string;
};
/**
 * The Markprompt input prompt. User input will update the prompt in the Markprompt context.
 */
declare const Prompt: React.ForwardRefExoticComponent<Omit<PromptProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
type AnswerProps = Omit<ComponentPropsWithoutRef<typeof Markdown>, "children">;
/**
 * Render the markdown answer from the Markprompt API.
 */
declare function Answer(props: AnswerProps): ReactElement;
declare namespace Answer {
    var displayName: string;
}
type AutoScrollerProps = ComponentPropsWithRef<"div"> & {
    /**
     * Whether or not to enable automatic scrolling.
     *
     * @default true
     */
    autoScroll?: boolean;
    /**
     * The behaviour to use for scrolling.
     *
     * @default 'smooth'
     */
    scrollBehavior?: ScrollBehavior;
};
/**
 * A component automatically that scrolls to the bottom.
 */
declare const AutoScroller: React.ForwardRefExoticComponent<Omit<AutoScrollerProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
type ReferencesProps<TRoot extends ElementType, TReference extends ElementType<{
    reference: FileSectionReference;
    index: number;
}>> = {
    /**
     * The wrapper component to render.
     * @default 'ul'
     */
    RootComponent?: TRoot;
    /**
     * The component to render for each reference.
     * @default 'li'
     */
    ReferenceComponent?: TReference;
};
/**
 * Render the references that Markprompr returned.
 */
declare const ForwardedReferences: React.ForwardRefExoticComponent<ReferencesProps<React.ElementType, React.ComponentType<{
    reference: FileSectionReference;
    index: number;
}>> & React.RefAttributes<unknown>>;
type SearchResultsProps = PolymorphicComponentPropWithRef<"ul", {
    label?: string;
    SearchResultComponent?: ElementType<SearchResultComponentProps & {
        index?: number;
    }>;
}>;
declare const SearchResults: React.ForwardRefExoticComponent<Omit<SearchResultsProps, "ref"> & React.RefAttributes<HTMLUListElement>>;
type SearchResultProps = PolymorphicComponentPropWithRef<"li", SearchResultComponentProps & {
    onMouseMove?: () => void;
    onClick?: () => void;
}>;
declare const SearchResult: React.ForwardRefExoticComponent<Omit<SearchResultProps, "ref"> & React.RefAttributes<HTMLLIElement>>;
export { Answer, AutoScroller, Close, Content, Description, DialogTrigger, Form, Overlay, PlainContent, Portal, Prompt, ForwardedReferences as References, Root, SearchResult, SearchResults, Title, type AnswerProps, type AutoScrollerProps, type CloseProps, type ContentProps, type DescriptionProps, type DialogTriggerProps, type FormProps, type OverlayProps, type PortalProps, type PromptProps, type ReferencesProps, type RootProps, type SearchResultProps, type SearchResultsProps, type TitleProps, };
//# sourceMappingURL=headless.d.ts.map