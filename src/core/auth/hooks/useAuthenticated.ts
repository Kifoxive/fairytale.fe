import { useAuth } from './useAuth';

export const useAuthenticated = () => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated || !user) {
        throw new Error('You can use useAuthenticated only when authenticated.');
    }

    return {
        isAuthenticated,
        user,
    };
};
