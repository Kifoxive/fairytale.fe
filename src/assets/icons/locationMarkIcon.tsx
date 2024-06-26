import type { IconProps } from './types';

export const LocationMarkIcon: React.FC<IconProps & { color?: string }> = ({ color = '#243c53', ...props }) => {
    return (
        <svg
            {...props}
            id="icon-locBlack"
            xmlns="http://www.w3.org/2000/svg"
            width="36.001"
            height="47.999"
            viewBox="0 0 36.001 47.999"
        >
            <path
                style={{ transition: 'all 0.2s ease' }}
                id="Exclusion_1"
                data-name="Exclusion 1"
                d="M-11416,255h0c-.045-.05-4.56-5.1-9-11.271a80.356,80.356,0,0,1-6.187-9.847c-1.866-3.626-2.812-6.615-2.812-8.882a17.882,17.882,0,0,1,1.414-7.006,17.928,17.928,0,0,1,3.857-5.721,17.945,17.945,0,0,1,5.722-3.857A17.9,17.9,0,0,1-11416,207a17.886,17.886,0,0,1,7.006,1.414,17.951,17.951,0,0,1,5.723,3.857,17.929,17.929,0,0,1,3.857,5.721A17.878,17.878,0,0,1-11398,225c0,2.268-.946,5.256-2.812,8.882a80.363,80.363,0,0,1-6.187,9.847c-4.44,6.174-8.955,11.221-9,11.271Zm0-38a8.009,8.009,0,0,0-8,8,8.009,8.009,0,0,0,8,8,8.009,8.009,0,0,0,8-8A8.009,8.009,0,0,0-11416,217Z"
                transform="translate(11434 -207.001)"
                fill={color}
            />
        </svg>
    );
};
