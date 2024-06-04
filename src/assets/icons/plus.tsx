import type { IconProps } from './types';

export const PlusIcon: React.FC<IconProps> = (props) => {
    return (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_124_2)">
                <path d="M12 17.6569V6.34315" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6.34315 12H17.6569" stroke="currentColor" strokeWidth="1.5" />
            </g>
            <defs>
                <clipPath id="clip0_124_2">
                    <rect width="24" height="24" />
                </clipPath>
            </defs>
        </svg>
    );
};
