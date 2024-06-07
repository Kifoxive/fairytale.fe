import moment from 'moment';

export const formatUnixDate = (value: string, options: { includeTime?: boolean } = {}) => {
    const { includeTime } = options;
    return value ? moment(new Date(Number(value))).format(`DD.MM.YYYY${includeTime ? ' HH:mm' : ''}`) : undefined;
};

export const formatPrice = (value: number | undefined, digits: number | undefined = 2) => value?.toLocaleString('cs-CZ', { minimumFractionDigits: digits });
