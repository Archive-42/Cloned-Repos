import NavBar from './Sections/NavBar';
import Splash from './Sections/Splash';
import HomeSty from './HomeSty';
import Journey from './Sections/Journey';
import Contact from './Sections/Contact';

import Projects from './Sections/Projects';

function Home() {
    return (
        <HomeSty>
            <Splash />
            <NavBar />
            <Journey />
            <Projects />
            <Contact />
           
        </HomeSty>
    );
}

export default Home;
