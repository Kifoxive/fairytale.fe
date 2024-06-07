import { SortingState } from '@tanstack/react-table';

export const getSortingParams = (value: SortingState) => { 
    if (value.length) {
        const { id: field, desc } = value[0];
        const direction = desc ? 'desc' : 'asc';
        return {
            sort: `${field}:${direction}` as const,
        };
    }
    return {};
};
