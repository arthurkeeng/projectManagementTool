import { useQuery } from "@apollo/client"
import { GET_SINGLE_PROJECT } from "../queries/projectQueries"
import Spinner from "../components/spinner"
import { Link, useParams } from "react-router-dom"
import ClientInfo from "../components/clientInfo"
import DeleteProjecButton from "../components/deleteProjectButton"

const SingleProject = () =>{
    const {id } = useParams()
    
    const { loading , error , data } = useQuery(GET_SINGLE_PROJECT , {
        variables : {
            id 
        }
    })

    if (loading){
        return <Spinner/>
    }
    if(error){
        return <div>
            Something happened
        </div>
    }

    return <>
    {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
            <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
            </Link>
            <h1>{data.project.name}</h1>
            <p>{data.project.description}</p>
            <p className="lead">
                {data.project.status}
            </p>
            <ClientInfo client = {data.project.client}/>
            <DeleteProjecButton projectId ={data.project.id}/>
        </div>
        

    )}

    
    </>
}

export default SingleProject