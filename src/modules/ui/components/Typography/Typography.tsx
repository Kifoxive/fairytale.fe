import { createElement } from 'react';
import classNames from 'classnames';

import styles from './Typography.module.scss';

type TypographyVariant = 'h4' | 'h3' | 'h1' | 'p';

type TypographyProps = React.ComponentProps<
    Exclude<TypographyVariant, 'subheading' | 'text-disabled' | 'headline-h4'>
> & {
    variant: TypographyVariant;
    component?: TypographyVariant;
    color?: 'black' | 'white' | 'light-yellow' | 'yellow' | 'blue';
    fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
    fontFamily?: 'roboto' | 'inder';
    // opacity on hover
    link?: boolean;
    underline?: boolean;
};

export const Typography: React.FC<TypographyProps> = ({
    variant,
    color = 'black',
    fontWeight = 'normal',
    fontFamily = 'roboto',
    link = false,
    underline = false,
    component,
    children,
    className,
    ...props
}) => {
    // Display "component" element if specified, always use styles based on the "variant".
    const element = component ? component : variant;
    return createElement(
        element,
        {
            className: classNames(className, styles[variant], styles[color], styles[fontWeight], styles[fontFamily], {
                [styles.link]: link,
                [styles.underline]: underline,
            }),
            ...props,
        },
        children,
    );
};
