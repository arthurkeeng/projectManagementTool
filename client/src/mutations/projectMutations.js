import { gql } from "@apollo/client";

// this is the mutation function that adds a new client
const ADD_PROJECT = gql`
    mutation addProject(
        $name : String! , $description : String! , $clientId : ID! , $status : ProjectStatus!
    ){
        addProject(name : $name , description : $description , clientId : $clientId ,status : $status){
            id , name , description , status 
            client{
                id , name , email , phone
            }
        }
    }
`

// this is the mutation function that deletes a client
const DELETE_PROJECT = gql`
    mutation deleteProject($id : ID!){
        deleteProject(id : $id){
            id , name , description , status
        }
    }


`

const EDIT_PROJECT = gql`
    mutation editProject( $id : ID! ,  $name : String! , $description : String! , 
    $status : ProjectChange 
    ){
        editProject(id : $id , name : $name , description : $description , status : $status){
            id , name , description , status ,
            client {
                id , name , phone , email
            }
        }
    }
`


export {
    DELETE_PROJECT , EDIT_PROJECT
    ,
     ADD_PROJECT}