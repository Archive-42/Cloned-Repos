import TimeNodeSty from './TimeNodeSty';
import { useContext, useEffect, useState } from 'react';
import { JourneyContext } from '../../Journey';
import { GiNestedHexagons } from 'react-icons/gi';
import NodeInfo from '../NodeInfo';
import { CSSTransition } from 'react-transition-group';

function TimeNode({ data }) {
    const id = Number.parseInt(data.id);
    const { node } = useContext(JourneyContext);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (id === node) setIsVisible(true);
        else setIsVisible(false);
    }, [node, id]);

    return (
        <TimeNodeSty isVisible={isVisible}>
            <div className='icon'>
                <GiNestedHexagons />
            </div>
            <CSSTransition
                in={isVisible}
                timeout={100}
                appear
                classNames='flip'
            >
                <NodeInfo data={data} />
            </CSSTransition>
        </TimeNodeSty>
    );
}

export default TimeNode;
