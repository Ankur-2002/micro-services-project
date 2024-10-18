import Stripe from 'stripe';

console.log('stripe key:', process.env.STRIPE_KEY);
export const stripe = new Stripe(process.env.STRIPE_KEY!, {
    apiVersion: '2024-09-30.acacia',
});
