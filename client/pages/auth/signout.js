import { useEffect } from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

const signout = () => {
    const { errors, doRequest } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => {
            Router.push('/');
        },
    });

    useEffect(() => {
        doRequest();
    }, []);
    return <div>signout</div>;
};

export default signout;
