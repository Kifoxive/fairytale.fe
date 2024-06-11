import { Typography } from '../Typography';

import styles from './Modal.module.scss';

interface ModalProps {
    show: boolean;
    label: string;
    description?: React.ReactElement | string;
    approveComponent: React.ReactElement;
    cancelComponent: React.ReactElement;
    width?: number;
    onClick: () => void;
    children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
    show,
    label,
    description,
    approveComponent,
    cancelComponent,
    width = 400,
    onClick,
    children,
}) => {
    if (!show) return null;

    return (
        <div className={styles.modal} onClick={onClick}>
            <div
                className={styles.container}
                style={{ width }}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className={styles.label}>
                    <Typography variant="h4" className={styles.type} fontWeight="medium">
                        {label}
                    </Typography>
                </div>
                {description && (
                    <div className={styles.description}>
                        <Typography variant="p">{description}</Typography>
                    </div>
                )}
                {children}
                <div className={styles.buttons}>
                    {cancelComponent}
                    {approveComponent}
                </div>
            </div>
        </div>
    );
};
