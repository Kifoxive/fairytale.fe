import { Typography } from 'modules/ui';

import styles from './Subheader.module.scss';

interface SubheaderProps extends React.ComponentProps<'div'> {
    title: string;
    startSlot?: React.ReactNode;
    titleSlot?: React.ReactNode;
    endSlot?: React.ReactNode;
}

export const Subheader = ({ children, startSlot, endSlot, title, titleSlot }: SubheaderProps) => {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.start}>
                    {startSlot}
                    {/* <Typography variant="h3" component="h1" fontWeight="bold"> */}
                    <Typography variant="h3" component="h3" fontWeight="bold">
                        {title}
                    </Typography>
                    {titleSlot}
                </div>
                <div className={styles.center}>{children}</div>
                <div className={styles.end}>{endSlot}</div>
            </div>
        </>
    );
};
