import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import classNames from 'classnames';

import styles from './RadioGroup.module.scss';

export type RadioGroupOptions = {
    value: string;
    label: React.ReactNode;
}[];

export type RadioGroupProps = {
    options: RadioGroupOptions;
    optionStyles?: string;
} & React.ComponentProps<typeof RadixRadioGroup.Root>;

export const RadioGroup = ({ value, options, optionStyles, ...props }: RadioGroupProps) => {
    return (
        <RadixRadioGroup.Root {...props} value={value || ''} className={styles.root} aria-label="View density">
            {options.map(({ value, label }) => (
                <div key={value} className={classNames(styles.wrapper, optionStyles)}>
                    <RadixRadioGroup.Item className={styles.item} value={value} id={value}>
                        <RadixRadioGroup.Indicator className={styles.indicator} />
                    </RadixRadioGroup.Item>
                    <label className={styles.label} htmlFor={value}>
                        {label}
                    </label>
                </div>
            ))}
        </RadixRadioGroup.Root>
    );
};
