import type { IconProps } from './types';

export const SearchIcon: React.FC<IconProps> = (props) => {
    return (
        <svg {...props} id="icon-search" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <circle
                id="Ellipse_4"
                data-name="Ellipse 4"
                cx="7"
                cy="7"
                r="7"
                transform="translate(4.5 4.5)"
                fill="none"
                stroke="#1e2124"
                strokeWidth="1.5"
            />
            <line
                id="Line_2"
                data-name="Line 2"
                x1="3"
                y1="3"
                transform="translate(16.5 16.5)"
                fill="none"
                stroke="#1e2124"
                strokeWidth="1.5"
            />
            <rect id="Rectangle_146" data-name="Rectangle 146" width="24" height="24" fill="none" />
        </svg>
    );
};
