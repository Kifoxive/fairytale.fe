import { useRef } from 'react';
import { DatePickerStateOptions, useDatePickerState } from 'react-stately';
import { DateValue, useDatePicker } from '@react-aria/datepicker';
import { CalendarIcon } from 'assets/icons';
import classNames from 'classnames';
import { Calendar, CalendarPopover, DateField, Dialog, FieldButton } from 'modules/datepicker';

import styles from './DatePicker.module.scss';

export type DatePickerProps = {
    popoverId?: string;
    error?: boolean;
    placeholder?: string;
} & DatePickerStateOptions<DateValue>;

export const DatePicker = ({ popoverId, error, placeholder, ...props }: DatePickerProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const state = useDatePickerState(props);
    const { isOpen } = state;
    const { groupProps, fieldProps, dialogProps, buttonProps, calendarProps } = useDatePicker(props, state, ref);

    return (
        <div
            ref={ref}
            {...groupProps}
            className={classNames(styles['date-picker'], {
                [styles['date-picker-error']]: error,
                [styles['date-picker-open']]: isOpen,
            })}
        >
            <DateField id={popoverId} placeholder={placeholder} {...fieldProps} />
            <FieldButton {...buttonProps}>
                <CalendarIcon />
            </FieldButton>
            {isOpen && (
                <CalendarPopover triggerRef={ref} state={state}>
                    <Dialog {...dialogProps}>
                        <Calendar {...calendarProps} />
                    </Dialog>
                </CalendarPopover>
            )}
        </div>
    );
};
