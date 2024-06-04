import { resolveValue, toast, Toaster } from 'react-hot-toast';
import { CheckWhiteIcon } from 'assets/icons';
import { CrossIcon } from 'assets/icons';
import { ExclamationIcon } from 'assets/icons';
import classNames from 'classnames';

import styles from './Toast.module.scss';

export const Toast = () => (
    <Toaster position="bottom-right">
        {(t) => (
            <div
                className={classNames(styles.toaster, {
                    [styles.success]: t.type === 'success',
                    [styles.error]: t.type === 'error',
                })}
            >
                <div className={styles.toaster_content}>
                    <div
                        className={classNames({
                            [styles.success_icon]: t.type === 'success',
                            [styles.error_icon]: t.type === 'error',
                        })}
                    >
                        {t.type === 'success' && <CheckWhiteIcon />}
                        {t.type === 'error' && <ExclamationIcon />}
                    </div>
                    {resolveValue(t.message, t)}
                </div>
                <button className={styles.close} onClick={() => toast.remove(t.id)}>
                    <CrossIcon />
                </button>
            </div>
        )}
    </Toaster>
);
