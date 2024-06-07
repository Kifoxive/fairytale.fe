import styles from './TableActionsContainer.module.scss';

export const TableActionsContainer = (props: React.ComponentProps<'div'>) => {
    return <div className={styles.container} {...props} />;
};
