import { useRef } from 'react';
import { mergeProps,useCalendarCell, useFocusRing } from 'react-aria';
import { CalendarState } from 'react-stately';
import classNames from 'classnames';

import styles from './CalendarCell.module.scss';

export function CalendarCell({ state, date }: { state: CalendarState; date: any }) {
    const ref = useRef<HTMLDivElement>(null);
    const { cellProps, buttonProps, isSelected, isOutsideVisibleRange, isDisabled, formattedDate, isInvalid } =
        useCalendarCell({ date }, state, ref);

    const { focusProps, isFocusVisible } = useFocusRing();

    return (
        <td {...cellProps}>
            <div
                className={classNames(styles.button, {
                    [styles['button-hovered']]: !isDisabled && !isSelected,
                    [styles['button-selected']]: !isDisabled && isSelected,
                    [styles['button-disabled']]: isDisabled && !isInvalid,
                    [styles['button-focus']]: isFocusVisible,
                })}
                {...mergeProps(buttonProps, focusProps)}
                ref={ref}
                hidden={isOutsideVisibleRange}
            >
                <div>{formattedDate}</div>
            </div>
        </td>
    );
}
