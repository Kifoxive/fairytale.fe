import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { numberInputOnWheelPreventChange } from 'utils';

import styles from './Input.module.scss';

export type InputProps = React.ComponentProps<'input'> & {
    endIcon?: React.ReactNode;
    error?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, endIcon, error, ...props }, ref) => (
    <div className={styles['input-wrapper']}>
        <input
            ref={ref}
            {...props}
            className={classNames(styles.input, { [styles['input-error']]: !!error }, className)}
            onWheel={numberInputOnWheelPreventChange}
        />
        {endIcon && <div className={styles['end-icon']}>{endIcon}</div>}
    </div>
));
