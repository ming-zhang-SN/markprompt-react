import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import React, {} from 'react';
export const ConditionalWrap = (props) => {
    const { condition, wrap, children } = props;
    return (condition ? wrap(children) : children);
};
export const ConditionalVisuallyHidden = (props) => {
    const { hide, children } = props;
    return (React.createElement(ConditionalWrap, { condition: hide, wrap: (children) => React.createElement(VisuallyHidden, null, children) }, children));
};
//# sourceMappingURL=ConditionalWrap.js.map