
import {gql} from "@apollo/client"


const GET_PROJECTS = gql`

    query getProjects {
        projects{
            name , description , status , id
        }
    }

`
const GET_SINGLE_PROJECT = gql`
    query getProject($id : ID!){
        project(id : $id){
            id , description , status , name
            client(id : $id) {
                name , phone , email
            }
        }
    }

`


export {GET_PROJECTS , GET_SINGLE_PROJECT}