import { useEffect, useRef, useState } from 'react';
import { DateValue, useDateField, useDateSegment, useLocale } from 'react-aria';
import { DateFieldState, DateFieldStateOptions, type DateSegment, useDateFieldState } from 'react-stately';
import { createCalendar } from '@internationalized/date';
import { AriaDateFieldOptions } from '@react-aria/datepicker';
import classNames from 'classnames';

import styles from './DateField.module.scss';

export type DateFieldProps = { id?: string; placeholder?: string } & (
    | DateFieldStateOptions<DateValue>
    | AriaDateFieldOptions<DateValue>
);

export const DateField = ({ id, placeholder, ...props }: DateFieldProps) => {
    const { locale } = useLocale();
    const state = useDateFieldState({
        ...props,
        locale,
        createCalendar,
    });

    const ref = useRef<HTMLDivElement>(null);
    const { fieldProps } = useDateField(props, state, ref);

    // Show placeholder only if there is no value, a placeholder is provided,
    // and the date field is not in focus
    const hasPlaceholder = !!placeholder;
    const allSegmentsAreEmpty = state.segments.every((segment) => segment.isPlaceholder || !segment?.value);
    const [shouldShowPlaceholder, setShouldShowPlaceholder] = useState(hasPlaceholder);

    const handlePlaceholderVisibility = () => setShouldShowPlaceholder(hasPlaceholder && allSegmentsAreEmpty);
    const hidePlaceholder = () => setShouldShowPlaceholder(false);

    useEffect(handlePlaceholderVisibility, [allSegmentsAreEmpty, hasPlaceholder]);

    return (
        <div className={styles.wrapper}>
            {shouldShowPlaceholder && (
                <div className={styles.datePlaceholder} onClick={hidePlaceholder}>
                    {placeholder}
                </div>
            )}
            <div
                id={id}
                {...fieldProps}
                ref={ref}
                className={classNames(styles.segments, {
                    [styles.segments_invisible]: shouldShowPlaceholder,
                })}
            >
                {state.segments.map((segment, i) => (
                    <DateSegment
                        key={i}
                        segment={segment}
                        state={state}
                        onFocus={hidePlaceholder}
                        onBlur={handlePlaceholderVisibility}
                    />
                ))}
            </div>
        </div>
    );
};

const renderSegment = (segment: DateSegment) => {
    if (segment.type === 'day' || segment.type === 'month') {
        return segment.text.padStart(2, '0');
    } else if (segment.type === 'year') {
        return segment.text.padStart(4, '0');
    }
    return segment.text;
};

function DateSegment({
    segment,
    state,
    onFocus,
    onBlur,
}: {
    segment: DateSegment;
    state: DateFieldState;
} & Pick<React.ComponentProps<'div'>, 'onFocus' | 'onBlur'>) {
    const ref = useRef<HTMLDivElement>(null);
    const { segmentProps } = useDateSegment(segment, state, ref);
    const { onFocus: onSegmentFocus, onBlur: onSegmentBlur, ...otherSegmentProps } = segmentProps;

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        onSegmentFocus?.(e);
        onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        onSegmentBlur?.(e);
        onBlur?.(e);
    };

    return (
        <div
            ref={ref}
            style={{
                ...segmentProps.style,
                minWidth: segment.maxValue != null ? String(segment.maxValue).length + 'ch' : undefined,
            }}
            className={classNames(styles.segment, {
                [styles['segment-literal']]: segment.type === 'literal',
            })}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...otherSegmentProps}
        >
            {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
            <span
                aria-hidden="true"
                className={styles.placeholder}
                style={{
                    visibility: segment.isPlaceholder ? undefined : 'hidden',
                    height: segment.isPlaceholder ? '' : 0,
                    pointerEvents: 'none',
                }}
            >
                {segment.placeholder}
            </span>
            {segment.isPlaceholder ? '' : renderSegment(segment)}
        </div>
    );
}
