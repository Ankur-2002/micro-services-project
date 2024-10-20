import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async (props = {}) => {
        try {
            setErrors(null);
            const callFunction = axios[method];
            const response = await callFunction(url, { ...body, ...props });
            onSuccess(response.data);
            return response.data;
        } catch (error) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Ooops....</h4>
                    <ul className="my-0">
                        {error?.response?.data?.errors?.map((err) => {
                            return <li key={err.message}>{err.message}</li>;
                        })}
                    </ul>
                </div>
            );
        }
    };

    return {
        errors,
        doRequest,
    };
};

export default useRequest;
