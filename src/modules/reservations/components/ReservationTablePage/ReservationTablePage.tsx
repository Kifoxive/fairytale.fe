import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import { useDocumentTitle } from 'core/application/hooks';
import { PageContent } from 'modules/layout';
import {
    formatUnixDate,
    getContainsFilterMeta,
    getDateRangeFilterMeta,
    Table,
    TableContainer,
    useTableState,
} from 'modules/table';
import { tableNames } from 'utils';

import { useGetAllReservationsQuery } from '../../api';
import { IReservation } from '../ReservationPage';
import styles from './ReservationTablePage.module.scss';
import { IconContact } from 'assets/icons';

const columnHelper = createColumnHelper<IReservation>();

export const ReservationTablePage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.reservation.table'));

    const [reservationIdToContact, setReservationIdToContact] = useState<string | null>(null);

    const { data: response, isLoading, isFetching } = useGetAllReservationsQuery({ limit: 10, offset: 0 });

    const navigate = useNavigate();
    // const isBackstageFetching = useAppSelector(getBackstageFetchingList).includes('Customers');
    // const appList = useAppSelector(getRefetchList);
    // const dispatch = useAppDispatch();
    // const { tableProps, queryParams, paginationParams } = useTableState<IReservation>({
    const { tableProps } = useTableState<IReservation>({
        rowIdKey: 'reservation_id',
        // onRowClick: (row) => navigate(row.original.reservation_id.toString()),
        defaultSorting: { id: 'customer_id', desc: true },
        tableName: tableNames.reservation.table,
    });

    // const { globalFilter, setGlobalFilter } = tableProps;

    // const {
    //     data: response,
    //     isLoading,
    //     isFetching,
    // } = useGetCustomersQuery({
    //     ...paginationParams,
    //     ...queryParams,
    // });
    // const { data, totalRows } = response || {};

    const columns = useMemo(
        () => [
            columnHelper.accessor('reservation_id', {
                header: t('reservation.table.reservation_id'),
                meta: {
                    ...getContainsFilterMeta(),
                },
            }),
            columnHelper.accessor('name', {
                header: t('reservation.table.name'),
                meta: {
                    ...getContainsFilterMeta(),
                },
            }),
            columnHelper.accessor('email', {
                header: t('reservation.table.email'),
                meta: {
                    ...getContainsFilterMeta(),
                },
            }),
            columnHelper.accessor('phone', {
                header: t('reservation.table.phone'),
                meta: {
                    ...getContainsFilterMeta(),
                },
            }),
            columnHelper.accessor('date', {
                header: t('reservation.table.date'),
                cell: (info) => formatUnixDate(info.getValue()),
                meta: {
                    ...getDateRangeFilterMeta(),
                },
            }),
            columnHelper.accessor('time', {
                header: t('reservation.table.time'),
                meta: {
                    ...getContainsFilterMeta(),
                },
            }),
            columnHelper.accessor('personCount', {
                header: t('reservation.table.personCount'),
                meta: {
                    ...getContainsFilterMeta(),
                },
            }),
            columnHelper.accessor('note', {
                header: t('reservation.table.note'),
                meta: {
                    ...getContainsFilterMeta(),
                },
            }),
            columnHelper.display({
                id: 'action-columns',
                cell: ({ row }) => (
                    <div className={styles.actionButtons}>
                        <button
                            onClick={() => setReservationIdToContact(row.original.reservation_id)}
                            type="button"
                            className={styles.contactBtn}
                        >
                            <IconContact />
                        </button>
                        {/* {isOfferClosed ? (
                            row.original.isWinner && (
                                <button
                                    onClick={() => setShowRemoveWinnerModal(true)}
                                    type="button"
                                    className={styles.removeBtn}
                                >
                                    <CrossIcon color="#fe173b" />
                                </button>
                            )
                        ) : (
                            <button
                                onClick={() => setOfferIdToWin(row.original.offer_id)}
                                type="button"
                                className={styles.selectBtn}
                            >
                                <CheckIcon color="#1770ff" />
                            </button>
                        )} */}
                    </div>
                ),
                meta: {
                    align: 'right',
                    disableRowClick: true,
                },
                enableSorting: false,
                enableColumnFilter: false,
            }),
        ],
        [t],
    );

    return (
        <PageContent
        // fullWidth
        // subheader={
        //     <Subheader
        //         title={t('nav.customers')}
        //         endSlot={
        //             <TableActionsContainer>
        //                 <Button onClick={() => navigate('new')}>{t('customers.newCustomer')}</Button>
        //             </TableActionsContainer>
        //         }
        //     >
        //         <SearchBar value={globalFilter} onChange={setGlobalFilter} />
        //     </Subheader>
        // }
        >
            <div className={styles.container}>
                <TableContainer limit>
                    <Table
                        data={response?.data || []}
                        columns={columns}
                        isLoading={isLoading || isFetching}
                        totalCount={response?.totalCount || 0}
                        getCellStyles={({ column }) => {
                            return column.id === 'reservation_id'
                                ? [Table.CellTextFormat.Bold, Table.CellTextColor.Primary]
                                : [];
                        }}
                        {...tableProps}
                    />
                </TableContainer>
            </div>
        </PageContent>
    );
};
