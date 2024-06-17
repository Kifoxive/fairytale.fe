// import { CircularProgress } from '@mui/material';
import { SpinnerIcon } from 'assets/icons';
import classNames from 'classnames';

import styles from './Spinner.module.scss';

export type SpinnerProps = {
    fullScreen?: boolean;
    className?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ fullScreen, className }) => {
    return (
        <div className={classNames({ [styles['wrapper-full-screen']]: fullScreen })}>
            <SpinnerIcon className={classNames(className, { [styles['spinner-full-screen']]: fullScreen })} />
            {/* <CircularProgress /> */}
        </div>
    );
};
