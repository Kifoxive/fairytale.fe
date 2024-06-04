import type { IconProps } from './types';

export const IconEmail: React.FC<IconProps & { iconBackgroundColor?: string }> = ({
    iconBackgroundColor = '1e2124',
    ...props
}) => {
    return (
        <svg id="icoMail" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
            <rect id="Rectangle_5069" data-name="Rectangle 5069" width="24" height="24" fill="none" />
            <g id="Group_12116" data-name="Group 12116" transform="translate(0.421 0.421)">
                <path
                    id="Path_5505"
                    data-name="Path 5505"
                    d="M18.536,9.613V2.75H4.81V9.613"
                    transform="translate(-0.094)"
                    fill="none"
                    stroke={iconBackgroundColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Path_5506"
                    data-name="Path 5506"
                    d="M19.425,9.28a2.147,2.147,0,0,1,.983,1.8v7.474a2.151,2.151,0,0,1-2.148,2.148H4.9A2.151,2.151,0,0,1,2.75,18.558V11.084a2.147,2.147,0,0,1,.983-1.8"
                    transform="translate(0 -0.297)"
                    fill="none"
                    stroke={iconBackgroundColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Path_5507"
                    data-name="Path 5507"
                    d="M19.471,9.59l-6.557,5.737a1.962,1.962,0,0,1-2.587,0L3.77,9.59"
                    transform="translate(-0.046 -0.311)"
                    fill="none"
                    stroke={iconBackgroundColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Path_5508"
                    data-name="Path 5508"
                    d="M14.13,15.01l5.813,4.973"
                    transform="translate(-0.518 -0.558)"
                    fill="none"
                    stroke={iconBackgroundColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Path_5509"
                    data-name="Path 5509"
                    d="M3.78,19.986,9.66,15.08"
                    transform="translate(-0.047 -0.561)"
                    fill="none"
                    stroke={iconBackgroundColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Path_5510"
                    data-name="Path 5510"
                    d="M7.89,5.83h.983"
                    transform="translate(-0.234 -0.14)"
                    fill="none"
                    stroke={iconBackgroundColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Path_5511"
                    data-name="Path 5511"
                    d="M7.89,8.92h7.846"
                    transform="translate(-0.234 -0.281)"
                    fill="none"
                    stroke={iconBackgroundColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
            </g>
        </svg>
    );
};
