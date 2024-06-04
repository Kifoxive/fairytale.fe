import type { IconProps } from './types';

export const SettingsIcon: React.FC<IconProps> = (props) => {
    return (
        <svg {...props} id="icon-filter" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g id="Group_11332" data-name="Group 11332" transform="translate(-319.58 -242.517)">
                <rect
                    id="Rectangle_3580"
                    data-name="Rectangle 3580"
                    width="24"
                    height="24"
                    transform="translate(319.58 242.517)"
                    fill="none"
                    opacity="0.354"
                />
            </g>
            <g
                id="Ellipse_666"
                data-name="Ellipse 666"
                transform="translate(3 4)"
                fill="none"
                stroke="#1e2124"
                strokeWidth="1.5"
            >
                <circle cx="4" cy="4" r="4" stroke="none" />
                <circle cx="4" cy="4" r="3.25" fill="none" />
            </g>
            <g
                id="Ellipse_668"
                data-name="Ellipse 668"
                transform="translate(21 21) rotate(180)"
                fill="none"
                stroke="#1e2124"
                strokeWidth="1.5"
            >
                <circle cx="4" cy="4" r="4" stroke="none" />
                <circle cx="4" cy="4" r="3.25" fill="none" />
            </g>
            <line
                id="Line_1983"
                data-name="Line 1983"
                x2="8.5"
                transform="translate(11 8)"
                fill="none"
                stroke="#1e2124"
                strokeLinecap="square"
                strokeWidth="1.5"
            />
            <line
                id="Line_1984"
                data-name="Line 1984"
                x2="8.6"
                transform="translate(13 17) rotate(180)"
                fill="none"
                stroke="#1e2124"
                strokeLinecap="square"
                strokeWidth="1.5"
            />
        </svg>
    );
};
