import styles from './FormGrid.module.scss';

export const FormGrid = ({
    children,
    columns = 1,
    rows = 1,
}: {
    children: React.ReactNode;
    columns?: 1 | 2 | 3 | 4;
    rows?: 1 | 2 | 3 | 4 | 5;
}) => {
    return (
        <div
            style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 11fr))`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
            className={styles.grid}
        >
            {children}
        </div>
    );
};
