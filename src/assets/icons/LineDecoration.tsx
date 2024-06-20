import type { IconProps } from './types';

export const IconLineDecoration: React.FC<IconProps> = (props) => {
    return (
        <svg width="44" height="21" viewBox="0 0 44 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M1 1L22 20L43 1" stroke="#111111" />
        </svg>
    );
};
