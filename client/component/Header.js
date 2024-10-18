import Link from 'next/link';
const Header = ({ currentUser }) => {
    console.log('HEADER COMPONENT RENDERED');
    const links = [
        !currentUser && {
            label: 'Sign Up',
            href: '/auth/signup',
        },
        !currentUser && {
            label: 'Sign In',
            href: '/auth/signin',
        },
        currentUser && {
            label: 'Sell Tickets',
            href: '/tickets/new',
        },
        currentUser && {
            label: 'My Orders',
            href: '/orders',
        },
        currentUser && {
            label: 'Sign Out',
            href: '/auth/signout',
        },
    ]
        .filter((linkConfig) => linkConfig)
        .map(({ label, href }) => {
            return (
                <li key={href} className="nav-items">
                    <Link href={href}>{label}</Link>
                </li>
            );
        });
    return (
        <nav className="navbar navbar-light bg-light p-1">
            <Link href={'/'} className="navbar-brand">
                GitTix
            </Link>
            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center g-1">{links}</ul>
            </div>
        </nav>
    );
};

export default Header;
