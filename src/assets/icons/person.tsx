import type { IconProps } from './types';

export const Person: React.FC<IconProps> = (props) => {
    return (
        <svg {...props} id="icon-person" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect
                id="Rectangle_5397"
                data-name="Rectangle 5397"
                width="24"
                height="24"
                rx="12"
                fill="#738291"
                opacity="0.12"
            />
            <path
                id="Path_5496"
                data-name="Path 5496"
                d="M13.941,13.015H7.813a2.813,2.813,0,0,0,0,5.625h6.129a2.813,2.813,0,0,0,0-5.625"
                transform="translate(1.123 -0.172)"
                fill="#738291"
            />
            <path
                id="Path_5497"
                data-name="Path 5497"
                d="M14.056,6.708c0-1.623-1.316-2.543-2.938-2.543s-2.938.92-2.938,2.543a3.3,3.3,0,0,0,2.938,3.334,3.3,3.3,0,0,0,2.938-3.334"
                transform="translate(0.613 1.247)"
                fill="#738291"
            />
        </svg>
    );
};
