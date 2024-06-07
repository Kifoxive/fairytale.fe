import React from 'react';
import { AriaDialogProps, useDialog } from 'react-aria';

export function Dialog({ children, ...props }: { children: React.ReactNode } & AriaDialogProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    const { dialogProps } = useDialog(props, ref);

    return (
        <div {...dialogProps} ref={ref}>
            {children}
        </div>
    );
}
