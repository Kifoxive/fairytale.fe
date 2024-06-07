import { ColumnFiltersState } from '@tanstack/react-table';

export const getColumnFiltersParams = <TSchema extends Record<string, unknown>>(columnFilters: ColumnFiltersState) => {
    return columnFilters.reduce((acc, filter) => {
        let value: object = {};

        if (Array.isArray(filter.value)) {
            if (filter.value[0] && filter.value[1]) {
                value = { [`${filter.id}_gte`]: filter.value[0], [`${filter.id}_lte`]: filter.value[1] };
            } else if (!filter.value[0]) {
                value = { [`${filter.id}_lte`]: filter.value[1] };
            } else {
                value = { [`${filter.id}_gte`]: filter.value[0] };
            }
        } else {
            value = { [filter.id]: filter.value };
        }

        /*const value = Array.isArray(filter.value)
            ? {
                  [`${filter.id}_gte`]: filter.value[0],
                  [`${filter.id}_lte`]: filter.value[1],
              }
            : {
                  [filter.id]: filter.value,
              };*/

        return { ...acc, ...value };
    }, {} as { [key in keyof TSchema]: string });
};
