export const stripe = {
    charges: {
        create: jest.fn().mockResolvedValue({ id: 'stripe-charge-id' }),
    },
    customers: {
        create: jest.fn().mockResolvedValue({ id: 'stripe-customer-id' }),
        list: jest
            .fn()
            .mockResolvedValue({ data: [{ id: 'stripe-customer-id' }] }),
    },
};
