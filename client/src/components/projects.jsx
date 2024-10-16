import { GET_PROJECTS } from "../queries/projectQueries"
import { useQuery } from "@apollo/client"
import Spinner from "./spinner"
import ProjectCard from "./ProjectCard"
const Projects = () =>{

    const {loading , error , data} = useQuery(GET_PROJECTS)


    if(loading) {
        return <Spinner/>
    }
    if(error) {
        return <p>Something went wrong</p>
    }
    return <>
{
    data.projects.length > 0 ? (
        <div className="row">
            <h2 className="m-4">THE PROJECTS</h2>
            {data.projects.map(project => (
                <ProjectCard key = {project.id} project = {project}/>
            ))}

        </div>
    )
    : <p>No Projects</p>
}    </>
}

export default Projects