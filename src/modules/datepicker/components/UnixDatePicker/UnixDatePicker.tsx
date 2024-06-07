import { useEffect, useState } from 'react';
import { DateValue } from 'react-aria';
import { CalendarDate } from '@internationalized/date';
import { DatePicker, type DatePickerProps } from 'modules/datepicker';

export type UnixDatePickerProps = Omit<DatePickerProps, 'value' | 'onChange' | 'minValue' | 'maxValue'> & {
    // All values represent dates in Unix timestamp format (string)
    value: string;
    onChange: (value: string) => void;
    minValue?: string;
    maxValue?: string;
};

// [year, month, day]
type DateValues = Readonly<[number, number, number]>;

// Converts Unix timestamp (string) to date values [year, month, day]
const getDateValues = (value: string): [number, number, number] => {
    const date = new Date(Number(value));
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
};

// Checks if all date components (year, month, day) are set
// Year must be 4-digit long to prevent premature conversion during user input
// For example, typing "202" is not considered a complete year value
const isDateComplete = (dateValues: DateValues) => {
    const [year, month, day] = dateValues;
    return !!(year.toString().length === 4 && month && day);
};

// Converts Unix timestamp (string) to CalendarDate object
const getCalendarDate = (value: string) => {
    const dateValues = getDateValues(value);
    if (isDateComplete(dateValues)) {
        return new CalendarDate(...dateValues);
    }
};

// Converts date values [year, month, day] to Unix timestamp
const getUnixTimestamp = (year: number, month: number, day: number) => {
    return Math.round(new Date(year, month - 1, day).getTime());
};

export const UnixDatePicker = ({ value, onChange, minValue, maxValue, ...props }: UnixDatePickerProps) => {
    const [calendarDate, setCalendarDate] = useState<CalendarDate | null>(null);

    useEffect(() => {
        if (value) {
            const newCalendarDate = getCalendarDate(value);
            if (newCalendarDate) {
                setCalendarDate(newCalendarDate);
            }
        } else {
            setCalendarDate(null);
        }
    }, [value]);

    const handleDateChange = (date: DateValue) => {
        if (date) {
            const dateValues: DateValues = [date.year, date.month, date.day];
            setCalendarDate(new CalendarDate(...dateValues));
            if (isDateComplete(dateValues)) {
                onChange(getUnixTimestamp(...dateValues).toString());
            }
        } else {
            setCalendarDate(null);
        }
    };

    return (
        <DatePicker
            value={calendarDate}
            onChange={handleDateChange}
            minValue={minValue ? getCalendarDate(minValue) : undefined}
            maxValue={maxValue ? getCalendarDate(maxValue) : undefined}
            {...props}
        />
    );
};
