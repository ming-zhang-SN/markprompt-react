import { type ReactNode, type ReactElement } from 'react';
type ConditionalWrapProps = {
    condition?: boolean;
    wrap: (children: ReactNode) => ReactNode;
    children: ReactNode;
};
export declare const ConditionalWrap: (props: ConditionalWrapProps) => ReactElement;
type ConditionalVisuallyHiddenProps = {
    children: ReactNode;
    hide?: boolean;
};
export declare const ConditionalVisuallyHidden: (props: ConditionalVisuallyHiddenProps) => ReactElement;
export {};
//# sourceMappingURL=ConditionalWrap.d.ts.map