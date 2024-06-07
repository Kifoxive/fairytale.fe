export type GetEmailAvailability = {
    request: {
        email: string;
    };
    response: {
        isAvailable: boolean;
    };
};
