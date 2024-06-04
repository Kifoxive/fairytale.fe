import { RootState } from 'store/types';

export const getRefetchList = (state: RootState) => state.app.lastOpenedTables;
export const getBackstageFetchingList = (state: RootState) => state.app.backstageFetching;
