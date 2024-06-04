import type { IconProps } from './types';

export const ExclamationIcon: React.FC<IconProps> = (props) => {
    return (
        <svg
            {...props}
            id="icon-exclamation"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <circle id="Ellipse_692" data-name="Ellipse 692" cx="12" cy="12" r="12" fill="none" opacity="0.1" />
            <path
                id="Path_5485"
                data-name="Path 5485"
                d="M-1,0H2.493L1.62,8.732H-.127Z"
                transform="translate(11.254 5.817)"
                fill="currentColor"
            />
            <rect
                id="Rectangle_5371"
                data-name="Rectangle 5371"
                width="3"
                height="3"
                rx="1.5"
                transform="translate(10.5 15.937)"
                fill="currentColor"
            />
            <rect id="Rectangle_45" data-name="Rectangle 45" width="24" height="24" fill="none" />
        </svg>
    );
};
