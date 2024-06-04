import type { IconProps } from './types';

export const ChevronDownIcon: React.FC<IconProps> = (props) => {
    return (
        <svg
            {...props}
            id="icon-chevronDown"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <g id="Group_11343" data-name="Group 11343" transform="translate(4, 4)">
                <rect
                    id="Rectangle_3614"
                    data-name="Rectangle 3614"
                    width="24"
                    height="24"
                    transform="translate(-4 -4)"
                    fill="none"
                />
                <path
                    id="Path_14"
                    data-name="Path 14"
                    d="M0,0,.182,6.818,7,7"
                    transform="translate(3.05 6.499) rotate(-45)"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
            </g>
        </svg>
    );
};
