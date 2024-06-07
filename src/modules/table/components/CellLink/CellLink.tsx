import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import styles from './CellLink.module.scss';

export const CellLink = ({
    path,
    title,
    bgColor = 'gray',
    openInNewTab,
}: {
    path: string;
    title: string;
    bgColor?: 'orange' | 'blue' | 'gray';
    openInNewTab?: boolean;
}) => {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        openInNewTab ? window.open(path, '_blank') : navigate(path);
    };

    if (!title) return null;

    return (
        <button
            className={classNames(styles.cell, {
                [styles[bgColor]]: bgColor,
            })}
            onClick={handleClick}
        >
            {title}
        </button>
    );
};
