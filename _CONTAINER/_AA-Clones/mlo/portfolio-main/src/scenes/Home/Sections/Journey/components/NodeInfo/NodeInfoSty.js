import styled from 'styled-components';
import { back, primary, secondary } from '../../../../../../styles/themes';

const svgInitial = '75px';
const svgHeight = `${svgInitial} + 6 * ((100vw - 320px) / 680);`;
const evenSpace = `(45vw - (${svgHeight})) / 3`;

const NodeInfoSty = styled.div`
    background: ${primary};
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    height: 160px;
    width: 55vw;
    border: ${secondary} solid 4px;
    border-radius: 4px;
    padding: 10px;
;
    .content {
        font-size: 0.7em;
    }

    .line {
        position: absolute;
        top: 74px;
        right: 100%;
        width: calc(${evenSpace});
        border: ${secondary} solid 2px;
        border-radius: 4px;
    }

    .title {
        color: ${back};
`;

export default NodeInfoSty;
