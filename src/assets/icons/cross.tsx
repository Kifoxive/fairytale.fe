import type { IconProps } from './types';

export const CrossIcon: React.FC<IconProps> = (props) => {
    return (
        <svg {...props} id="icon-cross" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect id="bg" width="24" height="24" fill="none" />
            <line
                id="Line_1985"
                data-name="Line 1985"
                y1="8"
                x2="8"
                transform="translate(8 8)"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <line
                id="Line_1986"
                data-name="Line 1986"
                y1="8"
                x2="8"
                transform="translate(16 8) rotate(90)"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </svg>
    );
};
