import { useEffect, useState } from 'react';

import { useQuery } from './useQuery';

export const useGetQueryParams = <T>(): Record<keyof T, string | undefined> => {
    const query = useQuery();
    const [values, setValues] = useState<Record<keyof T, string | undefined>>(undefined!);

    useEffect(() => {
        query.forEach((value, key) => {
            setValues((prev) => ({ ...prev, [key]: value }));
        });
    }, []);

    return { ...values };
};
