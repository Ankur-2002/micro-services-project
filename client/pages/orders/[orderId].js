import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/payments/new',
        method: 'post',
        body: {
            orderId: order.id,
        },
        onSuccess: (payment) => Router.push('/orders'),
    });
    const onToken = async (id) => {
        await doRequest({ token: id });
    };
    console.log(order);
    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expireAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);
    console.log(process.env.STRIPE_KEY, 'ENS');
    return (
        <div>
            <h1>Order Details</h1>
            <h4>Order ID: {order.id}</h4>
            <h4>Ticket ID: {order.ticket.id}</h4>
            <h4>Price: {order.ticket.price}</h4>
            <h4>Status: {order.status}</h4>

            {timeLeft < 0 ? (
                <h4>Order Expired</h4>
            ) : (
                <h4>
                    Time left to pay: {timeLeft} seconds
                    <br />
                    {errors}
                    <br />
                    <StripeCheckout
                        token={(token) => {
                            console.log(token);
                            onToken(token.id);
                        }}
                        stripeKey={`${process.env.STRIPE_KEY}`}  
                        amount={order.ticket.price * 100}
                        email={currentUser.email}
                        name={'Ticketing User'}
                    />
                </h4>
            )}
        </div>
    );
};

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);
    return { order: data };
};

export default OrderShow;
