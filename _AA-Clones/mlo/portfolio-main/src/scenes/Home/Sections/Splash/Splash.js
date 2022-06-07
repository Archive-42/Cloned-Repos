import Animation from './components/Animation/Animation';
import SplashSty from './SplashSty';
import data from '../../../../data/contactInfo.json';

function Splash() {
    return (
        <SplashSty id='home'>
            <Animation />
            <div className='intro'>
                <p className='name'>{data.name}</p>
                <p>{data.title}</p>
            </div>
            <a className='go' href='#journey'>
                Let's go!
            </a>
        </SplashSty>
    );
}

export default Splash;
