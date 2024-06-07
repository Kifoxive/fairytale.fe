import { useRef } from 'react';
import { AriaButtonProps,mergeProps, useButton, useFocusRing } from 'react-aria';

import styles from './CalendarButton.module.scss';

export function CalendarButton(props: AriaButtonProps<'button'>) {
    const ref = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(props, ref);
    const { focusProps } = useFocusRing();
    return (
        <button className={styles.button} {...mergeProps(buttonProps, focusProps)} ref={ref}>
            {props.children}
        </button>
    );
}
