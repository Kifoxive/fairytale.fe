import 'react-i18next';

import translationCs from '../../../../public/locales/cs/translation.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'translation';
        resources: {
            translation: typeof translationCs;
        };
    }
}
