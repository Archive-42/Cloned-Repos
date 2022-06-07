import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
    Navigation,
    Autoplay,
    EffectCoverflow,
    A11y,
} from 'swiper';
import 'swiper/swiper-bundle.css';

import Title from '../../../../components/Title';
import ProjectsSty from './ProjectsSty';

import projects from '../../../../data/projects.json';
import ProjectItem from './components/ProjectItem';

SwiperCore.use([Navigation, Autoplay, EffectCoverflow, A11y]);

function Projects() {
    return (
        <ProjectsSty>
            <Title title={'Projects'} id={'projects'} />

            <Swiper
                effect='coverflow'
                navigation
                grabCursor={true}
                centeredSlides={true}
                slidesPerView='auto'
                loop
                autoplay={{ delay: 3000 }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 0,
                    modifier: 1,
                    slideShadows: true,
                    slidesPerView: 2,
                }}
            >
                {projects.map((project) => (
                    <SwiperSlide key={`project-${project.id}`}>
                        <ProjectItem data={project} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </ProjectsSty>
    );
}

export default Projects;
