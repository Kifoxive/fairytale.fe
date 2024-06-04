import type { IconProps } from './types';

export const ChevronLeftIcon: React.FC<IconProps> = (props) => {
    return (
        <svg
            {...props}
            id="icon-chevronLeft"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <rect
                id="Rectangle_3614"
                data-name="Rectangle 3614"
                width="24"
                height="24"
                transform="translate(24 0) rotate(90)"
                fill="none"
            />
            <path
                id="Path_14"
                data-name="Path 14"
                d="M0,0,.182,6.818,7,7"
                transform="translate(13.501 7.05) rotate(45)"
                fill="none"
                stroke="#1e2124"
                strokeWidth="1.5"
            />
        </svg>
    );
};
