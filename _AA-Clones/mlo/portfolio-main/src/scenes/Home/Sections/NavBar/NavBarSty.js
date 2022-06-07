import styled from 'styled-components';
import { primary, accent, secondary, front } from '../../../../styles/themes';

const NavBarSty = styled.nav`
    position: sticky;
    z-index: 2;
    top: 0vh;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
    background-color: ${primary};

    path {
        color: ${front};
    }

    svg {
        height: 40px;
        width: 40px;
    }

    svg:hover {
        path {
            color: ${accent}
        }
    }
    .sidebar {
        position: absolute;
        display: flex;
        flex-flow: column;
        justify-content: space-evenly;
        min-width: 200px;
        max-width: 200px;
        width: 90vw;
        height: 200px;
        background: ${secondary};
        top: 100%;
        right 5px;
        border: 1px ${front} solid;
        text-align: center;
        padding: 20px;
    }

    .sidebar *:hover {
        color: ${accent};
    }

    .hamburger {
        position: relative;
        margin-right: 5px;
    }

`;

export default NavBarSty;
