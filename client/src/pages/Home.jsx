import ProjectModal from "../components/addProjectModal"
import Modal from "../components/addClientModal"
import Clients from "../components/clients"
import Projects from "../components/projects"


const Home = () => { 
    return <>
    <div className="d-flex gap-3 mb-4">

       <Modal/>
       <ProjectModal/>
    </div>
    <hr/>
      <Projects/>
     <Clients/>
    </>
}

export default Home