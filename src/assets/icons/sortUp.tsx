import type { IconProps } from './types';

export const SortUpIcon: React.FC<IconProps> = (props) => {
    return (
        <svg {...props} id="icon-sort-up" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <rect id="Rectangle_5197" data-name="Rectangle 5197" width="16" height="16" fill="none" />
            <path
                id="Polygon_16"
                data-name="Polygon 16"
                d="M4.646.354a.5.5,0,0,1,.707,0L9.146,4.146A.5.5,0,0,1,8.793,5H1.207a.5.5,0,0,1-.354-.854Z"
                transform="translate(3 1.5)"
                fill="#1e2124"
            />
            <path
                id="Polygon_17"
                data-name="Polygon 17"
                d="M4.646.354a.5.5,0,0,1,.707,0L9.146,4.146A.5.5,0,0,1,8.793,5H1.207a.5.5,0,0,1-.354-.854Z"
                transform="translate(13 14.5) rotate(180)"
                fill="#a7b0b9"
            />
        </svg>
    );
};
