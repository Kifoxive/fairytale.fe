import React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckWhiteIcon } from 'assets/icons';
import { MinusIcon } from 'assets/icons';
import classNames from 'classnames';

import styles from './Checkbox.module.scss';

export type CheckboxProps = RadixCheckbox.CheckboxProps & { error?: boolean; setChecked?: () => void };

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
    ({ checked, error, setChecked, onCheckedChange, ...props }, ref) => {
        return (
            <RadixCheckbox.Root
                ref={ref}
                checked={checked}
                {...props}
                onCheckedChange={() => {
                    if (setChecked) setChecked();
                    if (checked !== undefined && onCheckedChange) onCheckedChange(!checked);
                }}
                className={classNames(styles.checkbox, {
                    [styles['checkbox-error']]: error,
                    [styles['checkbox-disabled']]: props.disabled,
                })}
            >
                <RadixCheckbox.Indicator className={styles['indicator']}>
                    {checked === 'indeterminate' && <MinusIcon />}
                    {checked === true && <CheckWhiteIcon />}
                </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
        );
    },
);
