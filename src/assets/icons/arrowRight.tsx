import type { IconProps } from './types';

export const ArrowRightIcon: React.FC<IconProps> = (props) => {
    return (
        <svg
        id="icoArrowRight"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        color='#1770fe'
        {...props}
        >
            <rect id="Rectangle_6774" data-name="Rectangle 6774" width="16" height="16" fill="none" />
            <g id="Group_14835" data-name="Group 14835" transform="translate(-11034.375 -5059.61)">
                <path
                    id="Path_6565"
                    data-name="Path 6565"
                    d="M12,3.75V13.965"
                    transform="translate(11032.66 5079.375) rotate(-90)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    id="Path_6568"
                    data-name="Path 6568"
                    d="M11062.813,5068.238l3.765-3.765,3.765,3.765"
                    transform="translate(16111.53 -5999.203) rotate(90)"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
            </g>
        </svg>
    );
};
