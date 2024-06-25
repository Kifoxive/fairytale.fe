import type { IconProps } from './types';

export const CrossClassicIcon: React.FC<IconProps> = (props) => {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g filter="url(#filter0_d_185_275)">
                <path d="M5.10889 0.825195L22.7155 18.9998" stroke="#111111" />
                <path d="M4.8252 18.7158L22.9998 1.1092" stroke="#111111" />
            </g>
            <defs>
                <filter
                    id="filter0_d_185_275"
                    x="0.477539"
                    y="0.477539"
                    width="28"
                    height="28"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_185_275" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_185_275" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};
