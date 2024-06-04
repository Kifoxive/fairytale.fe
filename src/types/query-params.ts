type SortParams<T extends Record<string, unknown>> = { sort?: `${string & keyof T}:${'asc' | 'desc'}` };

export type PaginationParams = {
    limit: number;
    offset: number;
};

export type GlobalFilterParams = {
    search?: string;
};

type ColumnFilterParams<T extends Record<string, unknown>> = {
    [key in keyof T]: string;
};

export type QueryParams<T extends Record<string, unknown>> = SortParams<T> & GlobalFilterParams & ColumnFilterParams<T>;
