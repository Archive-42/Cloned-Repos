import { createContext, useContext, useEffect, useState } from 'react';
import TimeNode from './components/TimeNode';
import JourneySty from './JourneySty';
import data from '../../../../data/timeline.json';
import { ScrollContext } from '../../../../App';
import Title from '../../../../components/Title';
export const JourneyContext = createContext();

function Journey() {
    const { yAxis } = useContext(ScrollContext);
    const [node, setNode] = useState(1);

    useEffect(() => {
        const maths = Math.floor((yAxis - window.innerHeight / 2 + 50) / 240);
        setNode(maths < 2 ? 1 : maths);
    }, [yAxis]);

    return (
        <JourneySty>
            <JourneyContext.Provider value={{ node, setNode }}>
                <Title title={'My Journey'} id={'journey'} />
                <div className='timeline'>
                    {data.map((data) => (
                        <TimeNode key={data.id} data={data} />
                    ))}
                </div>
            </JourneyContext.Provider>
        </JourneySty>
    );
}

export default Journey;
