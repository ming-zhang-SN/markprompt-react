import type { FileSectionReference } from '@markprompt/core';
import { type ReactElement } from 'react';
type ReferencesProps = {
    loadingText?: string;
    heading?: string;
    getHref?: (reference: FileSectionReference) => string;
    getLabel?: (reference: FileSectionReference) => string;
    transformReferenceId?: (referenceId: string) => {
        href: string;
        text: string;
    };
    onDidSelectReference?: () => void;
};
declare const References: (props: ReferencesProps) => ReactElement | null;
export { References };
//# sourceMappingURL=References.d.ts.map