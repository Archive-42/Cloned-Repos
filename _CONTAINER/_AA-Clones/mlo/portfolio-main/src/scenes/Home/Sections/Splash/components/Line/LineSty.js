import styled from 'styled-components';
import { secondary } from '../../../../../../styles/themes';

const LineSty = styled.div`
    height: 101vh;
    width: 1px;
    z-index: 0;

    .dot {
        height: 2px;
        width: 2px;
        transform: translateY(101vh);
        background: ${secondary};
        border-radius: 50%;
    }
`;

export default LineSty;
