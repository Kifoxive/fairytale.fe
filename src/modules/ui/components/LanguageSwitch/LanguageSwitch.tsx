import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '@uidotdev/usehooks';
import { GlobeIcon } from 'assets/icons';
import { useGetQueryParams } from 'hooks/useGetQueryParams';
import { Language } from 'types/helpers';

import { Select } from '../Select';

import styles from './LanguageSwitch.module.scss';

export const LanguageSwitch = () => {
    const { i18n } = useTranslation();
    const [storedLang, setLanguage] = useLocalStorage<Language>('language', 'en');
    // useLocalStorage<Language>('language', 'en');
    const { lang: queryLang } = useGetQueryParams<{ lang: string }>();

    const options = [
        { value: 'en', label: 'English' },
        { value: 'ua', label: 'Українська' },
        // { value: 'cs', label: 'Čeština' },
        //{ value: 'de', label: 'Deutsch' },
    ];

    useEffect(() => {
        i18n.changeLanguage(storedLang);
    }, [storedLang]);

    useEffect(() => {
        i18n.changeLanguage(queryLang);
    }, [queryLang]);

    const handleChangeValue = (value: Language) => {
        i18n.changeLanguage(value);
        setLanguage(value);
    };

    return (
        <Select
            startIcon={<GlobeIcon className={styles.icon} height={24} width={24} />}
            className={styles.select}
            value={i18n.language}
            onValueChange={handleChangeValue}
            options={options}
            contentProps={{ position: 'popper', align: 'center' }}
        />
    );
};
