import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useLazyLogoutUserQuery } from 'core/api';
import { setAnonymous } from 'core/auth/services';
import { useAppDispatch } from 'hooks';

export const useLogout = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const [postLogout] = useLazyLogoutUserQuery();

    const logout = async () => {
        const { isSuccess } = await postLogout(null);
        if (isSuccess) {
            toast.success(t('auth.logout.success'));
            dispatch(setAnonymous());
        }
    };

    return logout;
};
