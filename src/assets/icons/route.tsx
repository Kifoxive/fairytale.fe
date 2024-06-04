import type { IconProps } from './types';

export const IconRoute: React.FC<IconProps & { dotted?: boolean }> = ({ dotted = false, ...props }) => {
    return (
        <svg id="iluTrasa" xmlns="http://www.w3.org/2000/svg" width="8" height="119" viewBox="0 0 8 119" {...props}>
            <g id="Ellipse_711" data-name="Ellipse 711" fill="none" stroke="#e4e7ea" strokeWidth="2">
                <circle cx="4" cy="4" r="4" stroke="none" />
                <circle cx="4" cy="4" r="3" fill="none" />
            </g>
            <circle
                id="Ellipse_713"
                data-name="Ellipse 713"
                cx="4"
                cy="4"
                r="4"
                transform="translate(0 111)"
                fill="#e4e7ea"
            />
            <g id="Group_16087" data-name="Group 16087" transform="translate(3.965 8)">
                <path
                    id="Path_10819"
                    data-name="Path 10819"
                    d={dotted ? 'M0,0H37.033' : 'M0,0H104'}
                    transform="translate(0.035 -1.048) rotate(90)"
                    fill="none"
                    stroke="#e4e7ea"
                    strokeWidth="2"
                />
                {dotted && (
                    <>
                        <path
                            id="Path_10820"
                            data-name="Path 10820"
                            d="M0,0H5.418"
                            transform="translate(0.035 40) rotate(90)"
                            fill="none"
                            stroke="#e4e7ea"
                            strokeWidth="2"
                        />
                        <path
                            id="Path_10821"
                            data-name="Path 10821"
                            d="M0,0H5.418"
                            transform="translate(0.035 49) rotate(90)"
                            fill="none"
                            stroke="#e4e7ea"
                            strokeWidth="2"
                        />
                        <path
                            id="Path_10822"
                            data-name="Path 10822"
                            d="M0,0H5.418"
                            transform="translate(0.035 59) rotate(90)"
                            fill="none"
                            stroke="#e4e7ea"
                            strokeWidth="2"
                        />
                        <path
                            id="Path_10823"
                            data-name="Path 10823"
                            d="M0,0H35.985"
                            transform="translate(0 69) rotate(90)"
                            fill="none"
                            stroke="#e4e7ea"
                            strokeWidth="2"
                        />
                    </>
                )}
            </g>
        </svg>
    );
};
