import type { IconProps } from './types';

export const ChartIcon: React.FC<IconProps> = (props) => {
    return (
        <svg {...props} id="icon-chart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect id="Rectangle_3581" data-name="Rectangle 3581" width="24" height="24" fill="none" />
            <path id="Path_8" data-name="Path 8" d="M4,4V20H20" fill="none" stroke="#1e2124" strokeWidth="1.5" />
            <g id="Group_11333" data-name="Group 11333" transform="translate(-1 1.479)">
                <path
                    id="Path_9"
                    data-name="Path 9"
                    d="M4.9,15.192l5.52-5.845,2.394,2.393L18.9,5.849"
                    transform="translate(0 0.521)"
                    fill="none"
                    stroke="#1e2124"
                    strokeWidth="1.5"
                />
                <path
                    id="Path_10"
                    data-name="Path 10"
                    d="M13.035,6.449h5v5"
                    transform="translate(0.785)"
                    fill="none"
                    stroke="#1e2124"
                    strokeWidth="1.5"
                />
            </g>
        </svg>
    );
};
