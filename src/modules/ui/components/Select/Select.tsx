import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDownIcon as DownIcon } from 'assets/icons';
import { CheckIcon } from 'assets/icons';
import classnames from 'classnames';

import styles from './Select.module.scss';

export type SelectOptions =
    | string[]
    | {
          value: string;
          label: string;
      }[];

export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> & {
    id?: string;
    error?: boolean;
    className?: string;
    placeholder?: string;
    options: SelectOptions;
    isNumber?: boolean;
    startIcon?: React.ReactNode;
    contentProps?: React.ComponentProps<typeof SelectPrimitive.Content>;
};

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
    ({ id, placeholder, options, className, error, value, startIcon, contentProps, ...props }, ref) => {
        return (
            <SelectPrimitive.Root value={String(value) || undefined} {...props}>
                <SelectPrimitive.Trigger
                    id={id}
                    ref={ref}
                    className={classnames(styles.trigger, className, {
                        [styles['trigger-error']]: error,
                    })}
                >
                    {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
                    <SelectPrimitive.Value color="black" placeholder={placeholder} />
                    <SelectPrimitive.Icon className={styles.icon}>
                        <DownIcon aria-hidden="true" />
                    </SelectPrimitive.Icon>
                </SelectPrimitive.Trigger>
                <SelectPrimitive.Portal>
                    <SelectPrimitive.Content {...contentProps} className={styles.content}>
                        <SelectPrimitive.ScrollUpButton className={styles['scroll-button']}>
                            <ChevronUpIcon />
                        </SelectPrimitive.ScrollUpButton>
                        <SelectPrimitive.Viewport className={styles.viewport}>
                            {options.map((option, index) => (
                                <SelectItem key={index} value={typeof option === 'string' ? option : option.value}>
                                    {typeof option === 'string' || typeof option === 'number'
                                        ? String(option)
                                        : option.label}
                                </SelectItem>
                            ))}
                        </SelectPrimitive.Viewport>
                        <SelectPrimitive.ScrollDownButton className={styles['scroll-button']}>
                            <ChevronDownIcon />
                        </SelectPrimitive.ScrollDownButton>
                    </SelectPrimitive.Content>
                </SelectPrimitive.Portal>
            </SelectPrimitive.Root>
        );
    },
);

export const SelectItem = ({ children, ...props }: SelectPrimitive.SelectItemProps) => {
    return (
        <SelectPrimitive.Item {...props} className={classnames(styles.item, {})}>
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
            <SelectPrimitive.ItemIndicator className={styles['item-indicator']}>
                <CheckIcon />
            </SelectPrimitive.ItemIndicator>
        </SelectPrimitive.Item>
    );
};
