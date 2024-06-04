import type { IconProps } from './types';

export const IconInfo: React.FC<IconProps & { color?: string }> = ({ color = '#1770fe', ...props }) => {
    return (
        <svg {...props} id="icoInfo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect id="Rectangle_45" data-name="Rectangle 45" width="24" height="24" fill="none" />
            <path
                id="Icon_awesome-info-circle"
                data-name="Icon awesome-info-circle"
                d="M8.563.563a8,8,0,1,0,8,8A8,8,0,0,0,8.563.563Zm0,3.548A1.355,1.355,0,1,1,7.208,5.466,1.355,1.355,0,0,1,8.563,4.111ZM10.369,12.3a.387.387,0,0,1-.387.387H7.143a.387.387,0,0,1-.387-.387V11.53a.387.387,0,0,1,.387-.387H7.53V9.079H7.143a.387.387,0,0,1-.387-.387V7.917a.387.387,0,0,1,.387-.387H9.208a.387.387,0,0,1,.387.387v3.226h.387a.387.387,0,0,1,.387.387Z"
                transform="translate(3.438 3.438)"
                fill={color}
            />
        </svg>
    );
};
