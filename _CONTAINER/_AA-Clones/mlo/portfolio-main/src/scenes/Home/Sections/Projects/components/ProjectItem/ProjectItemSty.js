import styled from 'styled-components';
import { secondary } from '../../../../../../styles/themes';

const ProjectItemSty = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    background: ${secondary};

    :hover {
        opacity: 0.8;
    }

    .title {
        text-align: center;
        margin: 20px;
    }

    img {
        height: 60%;
        width: 100%;
        object-fit: cover;
        object-position: 50% 0%;
    }

    .content {
        font-size: 0.8em;
        padding: 0 20px;
    }
`;

export default ProjectItemSty;
