import type { IconProps } from './types';

export const IconWarning: React.FC<IconProps> = (props) => {
    return (
        <svg
            {...props}
            width="48px"
            height="48px"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            preserveAspectRatio="xMidYMid meet"
        >
            <path d="M36.989 42.439H27.01L23 2h18z" fill="#1770ff"></path>
            <ellipse cx="31.999" cy="54.354" rx="7.663" ry="7.646" fill="#1770ff"></ellipse>
        </svg>
    );
};
