import type { IconProps } from './types';

export const FilterIcon: React.FC<IconProps> = (props) => {
    return (
        <svg {...props} id="icon-filter" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <defs>
                <clipPath id="clipPath">
                    <rect
                        id="Rectangle_3680"
                        data-name="Rectangle 3680"
                        width="10.355"
                        height="11"
                        transform="translate(0 0)"
                        fill="#a7b0b9"
                    />
                </clipPath>
            </defs>
            <rect id="Rectangle_5197" data-name="Rectangle 5197" width="16" height="16" fill="none" />
            <g id="Group_11929" data-name="Group 11929" transform="translate(3.231 3.436)">
                <g
                    id="Group_10580"
                    data-name="Group 10580"
                    transform="translate(-0.408 -0.436)"
                    clipPath="url(#clipPath)"
                >
                    <path
                        id="Path_5484"
                        data-name="Path 5484"
                        d="M10.065,0H.29a.288.288,0,0,0-.2.492L3.614,4.009a.789.789,0,0,1,.233.56V9.342a.233.233,0,0,0,.107.2l2.193,1.425a.233.233,0,0,0,.361-.2v-6.2a.791.791,0,0,1,.234-.56L10.27.492a.288.288,0,0,0-.2-.492"
                        transform="translate(0 0)"
                        fill="currentColor"
                    />
                </g>
            </g>
        </svg>
    );
};
