import type { IconProps } from './types';

export const PendingOnboardingStateIcon: React.FC<IconProps> = (props) => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_120_620)">
                <path
                    d="M2.03516 7.76514L12.2502 7.76514"
                    stroke="#1770FE"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
                <path d="M8.91699 4.00049L12.6816 7.76514L8.91699 11.5298" stroke="#1770FE" strokeWidth="1.5" />
            </g>
            <defs>
                <clipPath id="clip0_120_620">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};
