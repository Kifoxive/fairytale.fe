import type { IconProps } from './types';

export const LoaderTableIcon: React.FC<IconProps> = (props) => {
    return (
        <svg
            {...props}
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            height="72"
            viewBox="0 0 72 72"
            enableBackground="new 0 0 72 72"
            xmlSpace="preserve"
        >
            <rect fill="#C9D0DA" width="6" height="100" transform="translate(0) rotate(180 3 50)">
                <animate
                    attributeName="height"
                    attributeType="XML"
                    dur="1s"
                    values="30; 100; 30"
                    repeatCount="indefinite"
                />
            </rect>
            <rect x="17" fill="#C9D0DA" width="6" height="100" transform="translate(0) rotate(180 20 50)">
                <animate
                    attributeName="height"
                    attributeType="XML"
                    dur="1s"
                    values="30; 100; 30"
                    repeatCount="indefinite"
                    begin="0.1s"
                />
            </rect>
            <rect x="40" fill="#C9D0DA" width="6" height="100" transform="translate(0) rotate(180 40 50)">
                <animate
                    attributeName="height"
                    attributeType="XML"
                    dur="1s"
                    values="30; 100; 30"
                    repeatCount="indefinite"
                    begin="0.3s"
                />
            </rect>
            <rect x="60" fill="#C9D0DA" width="6" height="100" transform="translate(0) rotate(180 58 50)">
                <animate
                    attributeName="height"
                    attributeType="XML"
                    dur="1s"
                    values="30; 100; 30"
                    repeatCount="indefinite"
                    begin="0.5s"
                />
            </rect>
            <rect x="80" fill="#C9D0DA" width="6" height="100" transform="translate(0) rotate(180 76 50)">
                <animate
                    attributeName="height"
                    attributeType="XML"
                    dur="1s"
                    values="30; 100; 30"
                    repeatCount="indefinite"
                    begin="0.1s"
                />
            </rect>
        </svg>
    );
};
