// the import order must be strictly followed
// eslint-disable-next-line  simple-import-sort/imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { carrierApi } from 'modules/carriers';
import { PaginationParams } from 'types/query-params';
import { Location } from 'react-router-dom';

type tablePages = 'commissions' | 'carriers' | 'customers' | 'invoicing' | 'enquiry';

interface AppState {
    lastOpenedTables: Partial<
        Record<
            tablePages,
            {
                paginationParams: PaginationParams;
                someItemInsideWasUpdated: boolean;
            }
        >
    >;
    // tables, which are currently fetching because of websocket or another updates;
    // we are using it, 'cause we don't want to show a big loading spinner, when there is only websocket update
    backstageFetching: ('Commissions' | 'Carriers' | 'Customers' | 'Invoices' | 'Enquiry')[];
    // used to remember the commission
    routerHistory: Location[];
}

const initialState: AppState = {
    lastOpenedTables: {},
    backstageFetching: [],
    routerHistory: [],
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    extraReducers: (builder) => {
        builder.addMatcher(carrierApi.endpoints.postOnboardingEmail.matchFulfilled, (state) => {
            state.backstageFetching = state.backstageFetching = state.backstageFetching.filter(
                (tableRoute) => tableRoute !== 'Carriers',
            );
        });
    },
    reducers: {
        removeLastRecordFromRouterHistory: (state, { payload }: PayloadAction<number | undefined>) => {
            state.routerHistory = state.routerHistory.slice(0, -(payload ?? 1));
        },
    },
});

export const { removeLastRecordFromRouterHistory } = appSlice.actions;
