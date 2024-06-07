import { KeyboardEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from '@tanstack/react-table';
import { FilterIcon } from 'assets/icons';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { UnixDatePicker } from 'modules/datepicker';
import { Input, Popover, RadioGroup } from 'modules/ui';

import styles from './Filtering.module.scss';

type StringFilterValue = undefined | string;
type NumberRangeFilterValue = undefined | [StringFilterValue, StringFilterValue];

export enum FilteringType {
    Contains,
    NumberRange,
    DateRange,
    Select,
    DispatchersState,
    OfferState,
}

export const Filtering = ({ column }: { column: Column<any, unknown> }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const filter = column.columnDef.meta?.filter;

    if (!filter || !column.getCanFilter()) {
        return null;
    }

    const filterActive = !!column.getFilterValue();

    return (
        <Popover
            open={open}
            onOpenChange={(value) => setOpen(value)}
            Icon={<FilterIconWithActiveIndicator active={filterActive} />}
            label={column.columnDef.header as string}
            withHeader
        >
            <div
                className={styles.filtering}
                onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => event.key === 'Enter' && setOpen(false)}
            >
                {filter.type === FilteringType.Contains && <ContainsFilter column={column} />}
                {filter.type === FilteringType.NumberRange && <NumberRangeFilter column={column} />}
                {filter.type === FilteringType.Select && <SelectFilter column={column} />}
                {filter.type === FilteringType.DateRange && <DateRangeFilter column={column} />}

                <button className={styles['clear-button']} onClick={() => column.setFilterValue(null)}>
                    {t('table.filtering.clear')}
                </button>
            </div>
        </Popover>
    );
};

const FilterIconWithActiveIndicator = ({ active }: { active: boolean }) => {
    return (
        <div
            className={classNames(styles['icon-filter'], {
                [styles['icon-filter-active']]: active,
            })}
        >
            <FilterIcon />
        </div>
    );
};

const ContainsFilter = ({ column }: { column: Column<any, unknown> }) => {
    const [curValue, setCurValue] = useState<string>(column.getFilterValue() as string);

    const onSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
        handleSearch(e.currentTarget.value);
        setCurValue(e.currentTarget.value);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(
        debounce((value) => {
            column.setFilterValue(value);
        }, 300),
        [],
    );

    const { t } = useTranslation();
    return (
        <Input
            className={styles.input}
            value={curValue}
            onChange={onSearchChange}
            placeholder={t('table.filtering.contains')}
        />
    );
};

const NumberRangeFilter = ({ column }: { column: Column<any, unknown> }) => {
    const { t } = useTranslation();
    const [min, max] = (column.getFilterValue() as NumberRangeFilterValue) || [];

    return (
        <div className={styles['number-range-filter']}>
            <Input
                className={styles.input}
                placeholder={t('table.filtering.min')}
                value={min ?? ''}
                onChange={(event) =>
                    column.setFilterValue((old: NumberRangeFilterValue) => [event.target.value, old?.[1]])
                }
            />
            <Input
                className={styles.input}
                placeholder={t('table.filtering.max')}
                value={max ?? ''}
                onChange={(event) =>
                    column.setFilterValue((old: NumberRangeFilterValue) => [old?.[0], event.target.value])
                }
            />
        </div>
    );
};

const SelectFilter = ({ column }: { column: Column<any, unknown> }) => {
    const value = (column.getFilterValue() as StringFilterValue) || '';
    const options = column.columnDef.meta?.filter?.options || [];
    return <RadioGroup options={options} value={value} onValueChange={(value) => column.setFilterValue(value)} />;
};

type DateRangeFilterValue = string[];
const DateRangeFilter = ({ column }: { column: Column<any, unknown> }) => {
    const { t } = useTranslation();
    const [min, max] = (column.getFilterValue() as DateRangeFilterValue) || [];

    return (
        <div className={styles['number-range-filter']}>
            <UnixDatePicker
                value={min ?? ''}
                onChange={(value) => {
                    column.setFilterValue((old: DateRangeFilterValue) => [value, old?.[1]]);
                }}
                maxValue={max}
                placeholder={t('table.filtering.dateFrom')}
            />
            <UnixDatePicker
                value={max ?? ''}
                onChange={(value) => {
                    column.setFilterValue((old: DateRangeFilterValue) => [old?.[0], value]);
                }}
                minValue={min}
                placeholder={t('table.filtering.dateTo')}
            />
        </div>
    );
};
