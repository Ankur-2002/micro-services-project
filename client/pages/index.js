import Link from 'next/link';

// import { BuildClient } from '../api/build-client';
const LandingPage = ({ currentUser, data, err, ...props }) => {
    return (
        <div>
            <h1>Tickets</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((ticket) => (
                        <tr key={ticket.id}>
                            <td>{ticket.title}</td>
                            <td>{ticket.price}</td>
                            <td>
                                <Link
                                    href="/tickets/[ticketId]"
                                    as={`/tickets/${ticket.id}`}
                                >
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// This is will on server as well as on Browser
/**
 *
 * @param {*} param
 * @returns
 * Every time you navigate the route between pages that function will run on the browser but if you directly call this router by typing or in any other case that would trigger this function on the server side
 */
LandingPage.getInitialProps = async (context, client, currentUser) => {
    try {
        const { data } = await client.get('/api/tickets');
        console.log(data);
        return { data };
    } catch (err) {
        return { err };
    }
};

export default LandingPage;
