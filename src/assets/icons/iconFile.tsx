import type { IconProps } from './types';

export const IconFile: React.FC<IconProps> = (props) => {
    return (
        <svg {...props} id="icoFile" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
            <defs>
                <linearGradient
                    id="linear-gradient"
                    x1="0.175"
                    y1="0.935"
                    x2="1.041"
                    y2="-0.381"
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset="0" stopColor="#0565ff" />
                    <stop offset="1" stopColor="#80b0ff" />
                </linearGradient>
                <linearGradient
                    id="linear-gradient-2"
                    x1="0.203"
                    y1="0.874"
                    x2="1"
                    y2="0.17"
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset="0" stopColor="#eaf4ff" />
                    <stop offset="1" stopColor="#83abf8" />
                </linearGradient>
            </defs>
            <rect id="Rectangle_5432" data-name="Rectangle 5432" width="48" height="48" fill="none" />
            <path
                id="Path_5499"
                data-name="Path 5499"
                d="M23.768,36.756H2.971A2.975,2.975,0,0,1,0,33.776V2.988A2.975,2.975,0,0,1,2.971.008H14.7a3.955,3.955,0,0,1,2.8,1.164l8.077,8.1a3.978,3.978,0,0,1,1.161,2.81V33.776a2.975,2.975,0,0,1-2.971,2.98"
                transform="translate(10.501 5.249)"
                stroke="#65a0ff"
                strokeWidth="0.5"
                fill="url(#linear-gradient)"
            />
            <rect
                id="Rectangle_5429"
                data-name="Rectangle 5429"
                width="17.801"
                height="1.986"
                rx="0.993"
                transform="translate(14.97 27.099)"
                fill="#fff"
                opacity="0.6"
            />
            <rect
                id="Rectangle_5430"
                data-name="Rectangle 5430"
                width="17.801"
                height="1.986"
                rx="0.993"
                transform="translate(14.97 31.071)"
                fill="#fff"
                opacity="0.6"
            />
            <rect
                id="Rectangle_5431"
                data-name="Rectangle 5431"
                width="14.898"
                height="1.986"
                rx="0.993"
                transform="translate(14.942 35.044)"
                fill="#fff"
                opacity="0.6"
            />
            <path
                id="Path_5500"
                data-name="Path 5500"
                d="M25.984,9.462,17.718,1.2A4.242,4.242,0,0,0,16.024.2,5.672,5.672,0,0,0,14.191.009c1.2,0,1.833.543,1.833,1.426V8.116a3.041,3.041,0,0,0,3.04,3.04H26.1c.675,0,1.076.279,1.076,1.334a4.911,4.911,0,0,0-.194-1.334,3.57,3.57,0,0,0-.994-1.694"
                transform="translate(10.328 5)"
                fill="url(#linear-gradient-2)"
            />
        </svg>
    );
};
