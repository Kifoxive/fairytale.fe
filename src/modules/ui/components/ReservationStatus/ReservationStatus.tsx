import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import styles from './ReservationStatus.module.scss';
import { RESERVATION_STATUS } from 'modules/reservations';
import { HourglassTop, NotInterested, Done } from '@mui/icons-material';

export type ReservationStatusProps = {
    value: RESERVATION_STATUS;
};

export const ReservationStatus = ({ value }: ReservationStatusProps) => {
    const { t } = useTranslation();

    const offerStatusIcons: Record<RESERVATION_STATUS, React.ReactElement> = {
        [RESERVATION_STATUS['waiting']]: <HourglassTop />,
        [RESERVATION_STATUS['cancelled']]: <NotInterested />,
        [RESERVATION_STATUS['successful']]: <Done />,
    };

    return (
        <div
            className={classNames(styles.wrapper, {
                [styles.waiting]: value === RESERVATION_STATUS['waiting'],
                [styles.cancelled]: value === RESERVATION_STATUS['cancelled'],
                [styles.successful]: value === RESERVATION_STATUS['successful'],
            })}
        >
            {offerStatusIcons[value]}
            {t(`reservation.status.${value}`)}
        </div>
    );
};
