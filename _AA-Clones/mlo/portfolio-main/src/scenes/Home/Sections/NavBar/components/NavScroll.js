import { useContext } from 'react';
import { NavBarContext } from '../NavBar';

function NavScroll({ to, label, close }) {
    const { setOpen } = useContext(NavBarContext);
    return (
        <a href={to} onClick={() => setOpen(false)}>
            {label}
        </a>
    );
}

export default NavScroll;
