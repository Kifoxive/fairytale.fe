import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';

import transCs from '../../../../public/locales/cs/translation.json';
import transEn from '../../../../public/locales/en/translations.json';
import transUa from '../../../../public/locales/ua/translation.json';

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: ['cs', 'cs-CZ', 'en', 'ua'],
        debug: false,
        resources: {
            en: {
                translation: transEn,
            },
            cs: {
                translation: transCs,
            },
            ua: {
                translation: transUa,
            },
        },
    });

export default i18n;
