import { useAppSelector } from 'hooks';

import { selectAuth } from '../services/selectors';

export const useAuth = () => useAppSelector(selectAuth);
