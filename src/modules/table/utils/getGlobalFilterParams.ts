export const getGlobalFilterParams = (filter: string) => {
    return filter ? { search: filter } : {};
};
