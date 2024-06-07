import * as RadixPopover from '@radix-ui/react-popover';
import { CrossIcon } from 'assets/icons';

import { Typography } from '../Typography';

import styles from './Popover.module.scss';

type PopoverContentProps = Pick<React.ComponentProps<typeof RadixPopover.Content>, 'side' | 'align'>;
type PopoverRootProps = Pick<
    React.ComponentProps<typeof RadixPopover.Root>,
    'open' | 'defaultOpen' | 'onOpenChange' | 'modal' | 'children'
>;

export type PopoverProps = {
    label: string;
    Icon: React.ReactNode;
    withHeader?: boolean;
} & Pick<PopoverContentProps, 'side' | 'align'> &
    PopoverRootProps;

export const Popover = ({ label, children, side, align, Icon, withHeader, ...props }: PopoverProps) => {
    return (
        <RadixPopover.Root {...props}>
            <RadixPopover.Trigger asChild>
                <button className={styles.trigger} aria-label={label}>
                    {Icon}
                </button>
            </RadixPopover.Trigger>
            <RadixPopover.Portal>
                <RadixPopover.Content className={styles.content} side={side} align={align}>
                    <RadixPopover.Arrow className={styles.arrow} />
                    {withHeader && (
                        <div className={styles.header}>
                            <Typography className={styles.label} variant="p">
                                {label}
                            </Typography>
                            <RadixPopover.Close aria-label="Close" asChild>
                                <button className={styles.close}>
                                    <CrossIcon />
                                </button>
                            </RadixPopover.Close>
                        </div>
                    )}
                    {children}
                </RadixPopover.Content>
            </RadixPopover.Portal>
        </RadixPopover.Root>
    );
};
