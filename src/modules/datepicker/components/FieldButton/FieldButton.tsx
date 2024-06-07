import { useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';

import styles from './FieldButton.module.scss';

export const FieldButton = (props: AriaButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(props, ref);

    return (
        <button {...buttonProps} ref={ref} className={styles.button}>
            {props.children}
        </button>
    );
};
