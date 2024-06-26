import { config } from 'config';
import { AUTH_ROLE } from 'core/auth/types';
import moment from 'moment';

export const DEFAULT_REDIRECTS: Record<keyof typeof AUTH_ROLE, string> = {
    [AUTH_ROLE['admin']]: config.routes.reservation.table,
    [AUTH_ROLE['guest']]: config.routes.reservation.table,
};

export const tableNames = {
    reservation: {
        table: 'reservation-table',
    },
};

/**
 * Disable scrolling when on input with number type
 */

export const numberInputOnWheelPreventChange = (e: React.WheelEvent<HTMLInputElement>) => {
    // Prevent the input value change;
    'blur' in e.target && typeof e.target.blur === 'function' && e.target.blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    // Refocus immediately, on the next tick (after the current function is done)
    setTimeout(() => {
        'focus' in e.target && typeof e.target.focus === 'function' && e.target.focus();
    }, 0);
};

/**
 * Downloading the file.
 *
 * @param uri specifies the path to the file.
 * @param name new filename for the downloaded file.
 */
export function downloadURI(uri: string, name: string) {
    const link = document.createElement('a');
    document.body.appendChild(link);

    link.download = name;
    link.href = uri;
    link.click();
    link.parentNode && link.parentNode.removeChild(link);
}

/**
 * Printing the file.
 *
 * @param uri specifies the path to the file.
 */
export function printURI(uri: string) {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);

    iframe.style.display = 'none';
    iframe.src = uri;
    iframe.onload = function () {
        setTimeout(function () {
            iframe.focus();
            iframe.contentWindow?.print();
        }, 1);
    };
}

export const phoneRegex = new RegExp(/(?:\(?\+\d{2}\)?\s*)?\d+(?:[ -]*\d+)*$/);

/**
 * Generate array of hours with interval.
 *
 * @param startTime time from (11:00).
 * @param endTime time to (19:00).
 * @param intervalMinutes interval (15).
 * @returns array of times with interval.
 */
export function generateTimeIntervals(startTime: string, endTime: string, intervalMinutes: number) {
    const timeStops: { label: string; value: string }[] = [];
    const start = moment(startTime, 'HH:mm');
    const end = moment(endTime, 'HH:mm');

    while (start <= end) {
        const formatted = start.format('HH:mm');
        timeStops.push({ label: formatted, value: formatted });
        start.add(intervalMinutes, 'minutes');
    }

    return timeStops;
}
