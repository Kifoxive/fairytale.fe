import { AriaCalendarProps, useCalendar, useLocale } from 'react-aria';
import { CalendarStateOptions, useCalendarState } from 'react-stately';
import { createCalendar } from '@internationalized/date';
import { DateValue } from '@react-types/calendar';
import { ChevronLeftIcon } from 'assets/icons';
import { ChevronRightIcon } from 'assets/icons';
import { CalendarButton, CalendarGrid } from 'modules/datepicker';
import { Typography } from 'modules/ui';

import styles from './Calendar.module.scss';

export function Calendar(props: CalendarStateOptions<DateValue> | AriaCalendarProps<DateValue>) {
    const { locale } = useLocale();
    const state = useCalendarState({
        ...props,
        locale,
        createCalendar,
    });

    const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(props, state);

    return (
        <div {...calendarProps} className={styles.calendar}>
            <div className={styles.controls}>
                <CalendarButton {...prevButtonProps}>
                    <ChevronLeftIcon />
                </CalendarButton>
                <Typography variant="h4" className={styles['controls-title']}>
                    {title}
                </Typography>
                <CalendarButton {...nextButtonProps}>
                    <ChevronRightIcon />
                </CalendarButton>
            </div>
            <CalendarGrid state={state} />
        </div>
    );
}
