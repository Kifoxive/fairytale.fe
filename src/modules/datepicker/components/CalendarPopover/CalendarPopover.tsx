import * as React from 'react';
import { AriaPopoverProps } from 'react-aria';
import { DatePickerState } from 'react-stately';
import { DismissButton, Overlay,usePopover } from '@react-aria/overlays';

import styles from './CalendarPopover.module.scss';

export type CalendarPopoverProps = {
    children: React.ReactNode;
    state: DatePickerState;
} & Pick<AriaPopoverProps, 'triggerRef'>;

export const CalendarPopover = (props: CalendarPopoverProps) => {
    const ref = React.useRef(null);
    const { state, children } = props;

    const { popoverProps, underlayProps } = usePopover(
        {
            ...props,
            popoverRef: ref,
        },
        state,
    );

    return (
        <Overlay>
            <div {...underlayProps} className={styles.underlay} />
            <div {...popoverProps} ref={ref} className={styles.popover}>
                <DismissButton onDismiss={state.close} />
                {children}
                <DismissButton onDismiss={state.close} />
            </div>
        </Overlay>
    );
};
