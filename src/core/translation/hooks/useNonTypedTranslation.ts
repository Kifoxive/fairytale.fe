import { useTranslation } from 'react-i18next';

/**
 * useNonTypedTranslation hook
 * returns a translation function that is not typed by react-i18next
 * this function is useful when using template literals, because react-i18next typing does not support them
 *
 * tnt = translation not typed
 *
 * tnt function accepts a string as a parameter and returns a string
 *
 * @returns tnt function
 */

export type NonTypedTranslation = ReturnType<typeof useNonTypedTranslation>['tnt'];

export const useNonTypedTranslation = () => {
    const { t } = useTranslation();

    // @ts-expect-error Ignore type
    const tnt = (key: string, options?: UseTranslationOptions<TKPrefix>) => t(key, options) as string;

    return { tnt };
};
