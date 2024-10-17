import { useMutation } from "@apollo/client"
import { useState } from "react"
import { EDIT_PROJECT } from "../mutations/projectMutations"
import { GET_SINGLE_PROJECT } from "../queries/projectQueries"
import { useNavigate } from "react-router-dom"



const EditProjectForm  =({project}) =>{
    const navigate = useNavigate()
    const [name , setName] = useState(project.name)
    const [description , setDescription] = useState(project.description)
    const [status , setStatus] = useState()
    const [editProject] = useMutation(EDIT_PROJECT , {
        variables : {
            id : project.id , name , description , status
        },
        refetchQueries : [{query : GET_SINGLE_PROJECT , 
            variables : {id : project.id}
        }], 
        // onCompleted : () => navigate("/")
    })

    const submitForm = (e) =>{
        e.preventDefault()
        // if(!name === "" || !description)
        editProject()
    }
    return <div className="mt-5">
        <h3>
           Update Project Details </h3>
           <form onSubmit={submitForm}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select id="status" className="form-select" 
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  >
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>

                  </select>
                </div>
             
                <button
                  className="btn btn-primary"
                  type="submit"
                  
                >
                  Submit
                </button>
              </form>
           
        </div>
}


export default EditProjectForm