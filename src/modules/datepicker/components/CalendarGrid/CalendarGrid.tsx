import { useCalendarGrid, useLocale } from 'react-aria';
import { type CalendarState } from 'react-stately';
import { getWeeksInMonth } from '@internationalized/date';
import { CalendarCell } from 'modules/datepicker';

import styles from './CalendarGrid.module.scss';

export function CalendarGrid({ state }: { state: CalendarState }) {
    const { locale } = useLocale();
    const { gridProps, headerProps, weekDays } = useCalendarGrid({ weekdayStyle: 'long' }, state);

    // Get the number of weeks in the month so we can render the proper number of rows.
    const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

    return (
        <table {...gridProps} cellPadding="0" className={styles.table}>
            <thead {...headerProps} className={styles.header}>
                <tr className={styles.row}>
                    {weekDays.map((day, index) => (
                        <th className={styles.th} key={index}>
                            {day.slice(0, 2)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className={styles.columns}>
                {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
                    <tr key={weekIndex} className={styles.row}>
                        {state
                            .getDatesInWeek(weekIndex)
                            .map((date, i) =>
                                date ? <CalendarCell key={i} state={state} date={date} /> : <td key={i} />,
                            )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
