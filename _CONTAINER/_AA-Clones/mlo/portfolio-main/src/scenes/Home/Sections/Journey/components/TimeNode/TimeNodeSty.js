import styled from 'styled-components';
import { accent, back, secondary } from '../../../../../../styles/themes';

const svgInitial = '50px';
const svgHeight = `${svgInitial} + 6 * ((100vw - 320px) / 680)`;

const TimeNodeSty = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 200px;
    width: calc(100% - 1px);
    overflow: hidden;

    .icon {
        position: relative;
        z-index: 1;
    }

    svg {
        height: calc(${svgHeight});
        width: calc(${svgHeight});
    }

    path {
        color: ${({ isVisible }) => (isVisible ? accent : secondary)};
    }

    .blocker {
        position: absolute;
        height: 100vh;
        width: 100vw;
        padding: 20px;
        background: ${back};
    }
`;

export default TimeNodeSty;
