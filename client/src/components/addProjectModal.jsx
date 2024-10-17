import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation , useQuery} from "@apollo/client";
// import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

const ProjectModal = () => {
  const {loading , error , data} = useQuery(GET_CLIENTS)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [clientId, setClientId] = useState("");
    const [status, setStatus] = useState("new");

    // const 
    const [addProject] = useMutation(ADD_PROJECT, {
        variables : {
            name , description , clientId , status
        },        
        refetchQueries : [{query : GET_PROJECTS}],

        // the code below didnt refresh the page , hence we are 
        // using the refetchQueries instead

        update(cache , {data : {addProject}}){
            const {projects} = cache.readQuery({query : GET_PROJECTS});
            
            cache.writeQuery({
              query : GET_PROJECTS , 
              data : { projects : [...projects , addProject]}
            })
          }

    })

  const submitForm = (e) =>{
    e.preventDefault()

    if(name === "" || description === "" || clientId === "" || status === ""){
        return alert("Please fill in all the fields")
    }
    addProject(name , description , status , clientId);
    setName("")
    setStatus("new")
    setDescription("")
    setClientId("")
    
    // window.location.reload()
  }

  return (
    <>
    {!loading && !error && (
      <> 
      
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addProjectModal"
      >
        <div className="d-flex align-items-center ">
          <FaList className="icon" />
          <div>New Project</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addProjectModal"
        tabindex="-1"
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addProjectModalLabel">
                Add Project
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                <div className="mb-3">
                  <label className="form-label">Client</label>
                  <select id="clientId" className="form-select" 
                  value={clientId}
                  onChange={e => setClientId(e.target.value)}
                  >{data.clients.map(client => (
                    <>
                    <option key= {client.id} value={client.id}>{client.name}</option>
                    
                    </>
                  ))}
                  
                 
                    

                  </select>
                </div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </>
    ) }
    </>
  );
};

export default ProjectModal;
