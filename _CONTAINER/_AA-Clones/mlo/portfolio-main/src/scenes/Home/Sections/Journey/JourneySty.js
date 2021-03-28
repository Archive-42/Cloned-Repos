import styled from 'styled-components';
import data from '../../../../data/timeline.json';
import { front } from '../../../../styles/themes';

const JourneySty = styled.div`
    position: relative;
    height: ${data.length * 250}px;
    border: 1px solid ${front};
    padding: 20px;

    .timeline {
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        height: calc(100% - 50px);
    }
`;

export default JourneySty;
