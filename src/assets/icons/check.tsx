import type { IconProps } from './types';

export const CheckIcon: React.FC<IconProps & { color?: string }> = ({ color = 'currentColor', ...props }) => {
    return (
        <svg
            {...props}
            id="icon-check-blue"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
        >
            <rect id="Rectangle_3675" data-name="Rectangle 3675" width="16" height="16" fill="none" />
            <path
                id="Icon_awesome-check"
                data-name="Icon awesome-check"
                d="M3.367,11.825.145,8.6a.5.5,0,0,1,0-.7l.7-.7a.5.5,0,0,1,.7,0L3.718,9.372,8.367,4.722a.5.5,0,0,1,.7,0l.7.7a.5.5,0,0,1,0,.7l-5.7,5.7A.5.5,0,0,1,3.367,11.825Z"
                transform="translate(3.043 -0.274)"
                fill={color}
            />
        </svg>
    );
};
