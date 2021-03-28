import LineSty from './LineSty';

function Line({ delay, duration }) {
    return (
        <LineSty delay={delay} duration={duration}>
            <div
                className='dot'
                style={{
                    animation: `fall ${duration}s linear ${delay - 2}s infinite`,
                }}
            />
        </LineSty>
    );
}

export default Line;
