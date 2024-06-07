import { FilteringType } from 'modules/table';
import { type RadioGroupOptions } from 'modules/ui';

export const getContainsFilterMeta = () => {
    return {
        filter: {
            type: FilteringType.Contains,
        },
    };
};

export const getDispatchersStatesFilterMeta = () => {
    return {
        filter: {
            type: FilteringType.DispatchersState,
        },
    };
};

export const getOfferStateFilterMeta = () => {
    return {
        filter: {
            type: FilteringType.OfferState,
        },
    };
};

export const getNumberRangeFilterMeta = () => {
    return {
        filter: {
            type: FilteringType.NumberRange,
        },
    };
};

export const getDateRangeFilterMeta = () => {
    return {
        filter: {
            type: FilteringType.DateRange,
        },
    };
};

export const getSelectFilterMeta = (options: RadioGroupOptions) => {
    return {
        filter: {
            type: FilteringType.Select,
            options,
        },
    };
};

export const getBooleanFilterMeta = (options: RadioGroupOptions) => {
    return {
        filter: {
            type: FilteringType.Select,
            options,
        },
    };
};
