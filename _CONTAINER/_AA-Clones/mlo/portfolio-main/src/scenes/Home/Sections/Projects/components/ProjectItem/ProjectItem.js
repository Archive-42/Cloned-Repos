import ProjectItemSty from './ProjectItemSty';
function ProjectItem({ data }) {
    const handleClick = () => {
        window.open(data.url);
    };

    return (
        <ProjectItemSty onClick={handleClick}>
            <img alt={data.title} src={`/images/${data.image}`} />
            <div className='title'>{data.title}</div>
            <div className='content'>{data.info}</div>
        </ProjectItemSty>
    );
}

export default ProjectItem;
