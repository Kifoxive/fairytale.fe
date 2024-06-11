import React, { useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { createColumnHelper } from '@tanstack/react-table';
import { IconContact } from 'assets/icons';
import { useDocumentTitle } from 'core/application/hooks';
import { PageContent } from 'modules/layout';
import {
    formatUnixDate,
    getContainsFilterMeta,
    getDateRangeFilterMeta,
    // Table,
    // TableContainer,
    useTableState,
} from 'modules/table';
import { tableNames } from 'utils';
import { HourglassTop, NotInterested, Done } from '@mui/icons-material';
import { useChangeReservationStatusMutation, useGetAllReservationsQuery } from '../../api';
import { IReservation, RESERVATION_STATUS } from '../ReservationPage';

import styles from './ReservationTablePage.module.scss';
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Modal, ReservationStatus, Typography } from 'modules/ui';
import { AccessAlarm, CalendarMonth, Email, EmailOutlined, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { config } from 'config';
import { toast } from 'react-hot-toast';

const columnHelper = createColumnHelper<IReservation>();

export const ReservationTablePage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.reservation.table'));

    const [reservationIdToApprove, setReservationIdToApprove] = useState<IReservation | null>(null);
    const [reservationIdToCancel, setReservationIdToCancel] = useState<IReservation | null>(null);

    const { data: response, isLoading, isFetching } = useGetAllReservationsQuery({ limit: 10, offset: 0 });
    const [changeReservationStatus] = useChangeReservationStatusMutation();

    // const navigate = useNavigate();
    const { tableProps } = useTableState<IReservation>({
        rowIdKey: 'reservation_id',
        defaultSorting: { id: 'customer_id', desc: true },
        tableName: tableNames.reservation.table,
    });

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
            columnHelper.accessor('duration', {
                header: t('reservation.table.duration'),
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
            columnHelper.accessor('status', {
                header: t('reservation.table.status'),
                meta: {
                    ...getContainsFilterMeta(),
                },
            }),
            columnHelper.display({
                id: 'action-columns',
                cell: ({ row }) => (
                    <div className={styles.actionButtons}>
                        <button
                            // onClick={() => setReservationIdToContact(row.original.reservation_id)}
                            type="button"
                            className={styles.contactBtn}
                        >
                            <Email />
                        </button>
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

    const onApproveReservationStatus = async (reservation_id: string) => {
        try {
            await changeReservationStatus({ data: { reservation_id, status: RESERVATION_STATUS['successful'] } });
            toast.success(t('reservation.approveReservationStatusModal.success'));
            setReservationIdToApprove(null);
        } catch (error) {
            toast.success(t('reservation.approveReservationStatusModal.error'));
        }
    };
    const onCancelReservationStatus = async (reservation_id: string) => {
        try {
            await changeReservationStatus({ data: { reservation_id, status: RESERVATION_STATUS['cancelled'] } });
            toast.success(t('reservation.cancelReservationStatusModal.success'));
            setReservationIdToCancel(null);
        } catch (error) {
            toast.success(t('reservation.cancelReservationStatusModal.error'));
        }
    };

    return (
        <PageContent>
            <div className={styles.container}>
                {/*  <TableContainer limit>
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
                </TableContainer>*/}

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('reservation.table.reservation_id')}</TableCell>
                                <TableCell align="right">{t('reservation.table.name')}</TableCell>
                                {/* <TableCell align="right">{t('reservation.table.email')}</TableCell> */}
                                {/* <TableCell align="right">{t('reservation.table.date')}</TableCell> */}
                                {/* <TableCell align="right">{t('reservation.table.time')}</TableCell> */}
                                <TableCell />
                                <TableCell />
                                {/* <TableCell align="right">{t('reservation.table.duration')}</TableCell> */}
                                {/* <TableCell align="right">{t('reservation.table.personCount')}</TableCell> */}
                                <TableCell />
                                <TableCell align="right">{t('reservation.table.note')}</TableCell>
                                <TableCell align="center">{t('reservation.table.status')}</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {response?.data.map((row) => (
                                <TableRow
                                    key={row.reservation_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <Link to={config.routes.reservation.detail.replace(':id', row.reservation_id)}>
                                            <Typography variant="p" color="blue" fontWeight="medium">
                                                {row.reservation_id}
                                            </Typography>
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="p" fontWeight="medium">
                                            {row.name}
                                        </Typography>
                                        <Typography variant="p">{row.email}</Typography>
                                    </TableCell>
                                    {/* <TableCell align="right">{row.email}</TableCell> */}
                                    <TableCell align="right">
                                        <div className={styles.calendarCell}>
                                            <CalendarMonth /> {formatUnixDate(String(row.date))}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className={styles.timeCell}>
                                            <AccessAlarm />
                                            <Typography variant="p">{row.time}</Typography>
                                            <Typography variant="p">
                                                {t('common.dates.hours', {
                                                    defaultValue: '0',
                                                    count: row.duration,
                                                    number: row.duration,
                                                })}
                                            </Typography>
                                        </div>
                                    </TableCell>
                                    {/* <TableCell align="right">{row.duration}</TableCell> */}
                                    <TableCell align="right">
                                        <div className={styles.personCountCell}>
                                            <Person />
                                            {row.personCount}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right" width="100%">
                                        {row.note}
                                    </TableCell>
                                    <TableCell align="right">
                                        <ReservationStatus value={row.status} />
                                    </TableCell>
                                    <TableCell>
                                        <div className={styles.conversationStatusCell}>
                                            <IconButton
                                                size="medium"
                                                onClick={() => setReservationIdToApprove(row)}
                                                disabled={row.status === RESERVATION_STATUS['successful']}
                                            >
                                                <Done
                                                    color={
                                                        row.status === RESERVATION_STATUS['successful']
                                                            ? 'disabled'
                                                            : 'success'
                                                    }
                                                />
                                            </IconButton>
                                            <IconButton
                                                size="medium"
                                                onClick={() => setReservationIdToCancel(row)}
                                                disabled={row.status === RESERVATION_STATUS['cancelled']}
                                            >
                                                <NotInterested
                                                    color={
                                                        row.status === RESERVATION_STATUS['cancelled']
                                                            ? 'disabled'
                                                            : 'error'
                                                    }
                                                />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Modal
                show={Boolean(reservationIdToApprove)}
                onClick={() => setReservationIdToApprove(null)}
                label={t('reservation.approveReservationStatusModal.label')}
                // description={t('reservation.changeReservationStatusModal.description', { email: emailToContact })}
                description={
                    <Trans
                        i18nKey={'reservation.approveReservationStatusModal.description'}
                        values={{ email: reservationIdToApprove?.email || '' }}
                        components={{ strong: <strong /> }}
                    />
                }
                cancelComponent={
                    <Button type="button" variant="outlined" onClick={() => setReservationIdToApprove(null)}>
                        {t('reservation.approveReservationStatusModal.cancel')}
                    </Button>
                }
                approveComponent={
                    <Button
                        type="button"
                        danger
                        variant="contained"
                        onClick={() => {
                            onApproveReservationStatus(reservationIdToApprove?.reservation_id || '');
                        }}
                    >
                        {t('reservation.approveReservationStatusModal.approve')}
                    </Button>
                }
            />
            <Modal
                show={Boolean(reservationIdToCancel)}
                onClick={() => setReservationIdToCancel(null)}
                label={t('reservation.cancelReservationStatusModal.label')}
                // description={t('reservation.changeReservationStatusModal.description', { email: emailToContact })}
                description={
                    <Trans
                        i18nKey={'reservation.cancelReservationStatusModal.description'}
                        values={{ email: reservationIdToCancel?.email || '' }}
                        components={{ strong: <strong /> }}
                    />
                }
                cancelComponent={
                    <Button type="button" variant="outlined" onClick={() => setReservationIdToCancel(null)}>
                        {t('reservation.cancelReservationStatusModal.cancel')}
                    </Button>
                }
                approveComponent={
                    <Button
                        type="button"
                        danger
                        variant="contained"
                        onClick={() => {
                            onCancelReservationStatus(reservationIdToCancel?.reservation_id || '');
                        }}
                    >
                        {t('reservation.cancelReservationStatusModal.approve')}
                    </Button>
                }
            />
        </PageContent>
    );
};
