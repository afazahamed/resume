import { Link } from 'react-router-dom';

function ProjectListCard({ projects }) {

    if (!projects) return <div>Loading...</div>

    return (
        <>
            <div className="card--project">
                <Link to={`/resume/${projects.slug.current}`}>{projects.name}</Link>
            </div>
        </>
    )
}

export default ProjectListCard;