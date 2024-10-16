import Header from "./components/Header";
import { ApolloProvider
  , ApolloClient, InMemoryCache , 

 } from "@apollo/client";
import Clients from "./components/clients";
import Projects from "./components/projects";
// import { Query } from "mongoose";
import Modal from "./components/addClientModal";
const cache = new InMemoryCache({
  typePolicies : {
    Query : {
      fields : {
        clients : {
          merge(existing , incoming){
            return incoming
          }
        },
        projects: {
          merge(existing , incoming){
            return incoming
          }
        }
      }
    }
  }
})
const client = new ApolloClient({
  uri : "http://localhost:4200/graphql", 
  cache
})

function App() {
  return (<>
  <ApolloProvider client={client}>


    <Header/>
    <div className="container">
      <Modal/>
      <Projects/>
     <Clients/>
    </div>
  </ApolloProvider>
  </>
  );
}

export default App;
