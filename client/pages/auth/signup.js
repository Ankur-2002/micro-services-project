import { useState } from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        body: { email: email, password: password },
        url: '/api/users/signup',
        method: 'post',
        onSuccess: () => Router.push('/'),
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await doRequest();
        console.log(response);
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input
                    value={email}
                    className="form-control"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                ></input>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    className="form-control"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                ></input>
            </div>

            {errors}
            <button className="btn btn-primary" onChange={onSubmit}>
                Sign Up
            </button>
        </form>
    );
};

export default Signup;
