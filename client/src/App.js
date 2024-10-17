import Header from "./components/Header";
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";

import { ApolloProvider
  , ApolloClient, InMemoryCache , 

 } from "@apollo/client";

import Home from "./pages/Home";
import NotFound from "./pages/Not-Found";
import SingleProject from "./pages/Project";
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
    <Router>


    <Header/>
    <div className="container">
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/projects/:id" element = {<SingleProject/>}/>
      <Route path="*" element = {<NotFound/>}/>
    </Routes>
    </div>
    </Router>

  </ApolloProvider>
  </>
  );
}

export default App;
