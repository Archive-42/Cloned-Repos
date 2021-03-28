import styled from 'styled-components';
import { back } from '../../../../../../styles/themes';

const AnimationSty = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-around;
    height: 100vh;
    width: 100vw;
    background: radial-gradient(circle, ${back}, #06051f);
    z-index: -1;
    overflow: hidden;
        
`;

export default AnimationSty;
