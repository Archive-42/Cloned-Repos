import styled from 'styled-components';
import { accent, front } from '../../../../styles/themes';

const SplashSty = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: relative;
    z-index: 2;

    .intro {
        text-align: center;
        margin-bottom: 80px;
    }

    .go {
        font-size: 0.8em;
        border: 3px ${front} solid;
        padding: 10px;
    }

    .go:hover {
        color: ${accent};
        border: 3px ${accent} solid;
    }

    .name {
        color: ${accent};
        font-size: 2.5em;
        margin: 20px;
    }
`;

export default SplashSty;
