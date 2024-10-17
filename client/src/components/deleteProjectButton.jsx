import { useMutation, useQuery } from "@apollo/client"
import { DELETE_PROJECT } from "../mutations/projectMutations"
import { GET_PROJECTS } from "../queries/projectQueries";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const DeleteProjecButton = ({projectId}) =>{

    const navigate = useNavigate()

    const [deleteProject] = useMutation(DELETE_PROJECT,{
        variables : {id : projectId}, 
        onCompleted : () => navigate("/"),
        refetchQueries : [{query : GET_PROJECTS}],

        // the code below didnt refresh the page , hence we are 
        // using the refetchQueries instead
        
        // update(cache , {data :{deleteProject}}){
        //   const {projects} = cache.readQuery({query : GET_PROJECTS});
          
        //   cache.writeQuery({
        //     query : GET_PROJECTS , 
        //     data : { projects : projects.filter( project => {
        //      return project.id !== deleteProject.id})}
        //   })
        // }
    })

    // const deleteSingleProject =() =>{
    //     deleteProject(projectId)
    //     navigate("/")

    // }
    return <div className="d-flex mt-5 ms-auto ">
        <button onClick={deleteProject} className="btn btn-danger m-2">
            <FaTrash/>
            Delete Project
        </button>
    </div>
}

export default DeleteProjecButton