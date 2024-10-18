import 'bootstrap/dist/css/bootstrap.css';
import { BuildClient } from '../api/build-client';
import Header from '../component/Header';
import { useEffect } from 'react';

const AppComponent = ({ Component, pageProps, ...props }) => {
    useEffect(() => {
        process.env = props.env;
    }, []);
    return (
        <div>
            <Header currentUser={props.data?.currentUser} />
            <div className="container">
                <Component
                    {...pageProps}
                    currentUser={props.data?.currentUser}
                />
            </div>
        </div>
    );
};

export default AppComponent;

AppComponent.getInitialProps = async (context) => {
    try {
        const client = await BuildClient(context.ctx);
        const response = await client.get('/api/users/currentuser');
        // console.log('_APP.JS', response.data);
        /**
         * This will call the page level getInitialProps Function
         */
        let pageProps = {};
        if (context.Component.getInitialProps)
            pageProps = await context.Component.getInitialProps(
                context.ctx,
                client,
                response.data.currentUser
            );
        return {
            pageProps,
            data: response.data,
            env: process.env,
        };
    } catch (err) {
        return { err };
    }
};
