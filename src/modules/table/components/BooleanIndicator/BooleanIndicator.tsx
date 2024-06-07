import { CheckGreenIcon } from 'assets/icons';
import { ExclamationIcon } from 'assets/icons';
import classNames from 'classnames';

import styles from './BooleanIndicator.module.scss';

export const BooleanIndicator = ({ value }: { value: boolean }) => {
    return value ? (
        <CheckGreenIcon className="good" />
    ) : (
        <ExclamationIcon className={classNames(styles.exclamation, 'bad')} />
    );
};
