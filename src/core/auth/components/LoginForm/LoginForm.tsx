import { useTranslation } from 'react-i18next';

import { useDocumentTitle } from '../../../application/hooks/useDocumentTitle';
import { AuthPage } from '../AuthPage/AuthPage';

import styles from './LoginForm.module.scss';

export const LoginForm = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('auth.login.title'));

    return <AuthPage>Login</AuthPage>;
};
