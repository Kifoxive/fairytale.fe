import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { config } from 'config';
import { useLazyLogoutUserQuery } from 'core/api';
import { setAnonymous } from 'core/auth/services';
import { useAppDispatch } from 'hooks';

export const useLogout = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [postLogout] = useLazyLogoutUserQuery();

    const logout = async () => {
        try {
            await postLogout(null);
            toast.success(t('logout.success'));
            dispatch(setAnonymous());
            navigate(config.routes.home);
        } catch (error) {
            console.log(error);
        }
    };

    return logout;
};
