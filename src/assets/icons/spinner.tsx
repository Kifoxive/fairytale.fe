import type { IconProps } from './types';

export const SpinnerIcon: React.FC<IconProps> = (props) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <style>{`
                .spinner {
                    transform-origin: center;
                    animation: spinner_zKoa 2s linear infinite;
                }
                .spinner circle {
                    strokeLinecap: round;
                    animation: spinner_YpZS 1.5s ease-in-out infinite;
                }
                @keyframes spinner_zKoa {
                    100% {
                        transform: rotate(360deg);
                    }
                }
                @keyframes spinner_YpZS {
                    0% {
                        stroke-dasharray: 0 150;
                        stroke-dashoffset: 0;
                    }
                    47.5% {
                        stroke-dasharray: 42 150;
                        stroke-dashoffset: -16;
                    }
                    95%, 100% {
                        stroke-dasharray: 42 150;
                        stroke-dashoffset: -59;
                    }
                }
            `}</style>
            <g className="spinner">
                <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3"></circle>
            </g>
        </svg>
    );
};
