const { projects, clients } = require("../sample");
const Client = require("../models/clients")
const Project = require("../models/projects")
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLEnumType,
} = require("graphql");

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const client = await Client.findById(parent.clientId)
        return client
      },
    },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    clients: {
      type: new GraphQLList(ClientType),

      async resolve() {
        const clients = await Client.find()
        return clients;
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const client = await Client.findById(args.id)
        return client
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      async resolve() {
        const projects = await Project.find();
        return projects;
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const project = await Project.findById(args.id)
        return project
      },
    },
  }),
});

const RootMutations = new GraphQLObjectType({
  name : "RootMutations",
  fields : ()=>({
      addClient: {
        type : ClientType,
        args : {
          name : {type : new GraphQLNonNull(GraphQLString)},
          email : {type : new GraphQLNonNull(GraphQLString)},
          phone : {type : new GraphQLNonNull(GraphQLString)}
        },
       async  resolve(parent ,args){
          const client = await Client.create({
              name : args.name , email: args.email , phone : args.phone
          })
          return client
        }
      }, 
      deleteClient : {
        type : ClientType , 
        args : {
          id : {type : GraphQLID}
        }, 
        async resolve(parent , args){
          await Project.deleteMany({clientId : args.id})
          
          const deletedClient = await Client.findOneAndDelete({_id : args.id})
            
            return deletedClient
        }
      }, 
      addProject : {
        type : ProjectType,
        args : {
          name : {type : new GraphQLNonNull(GraphQLString)},
          description : {type  : new GraphQLNonNull(GraphQLString)},
          status : {
            type : new GraphQLEnumType({
              name : "ProjectStatus",
              values : {
                "new" : { value : "Not Started"},
                "progress" : { value : "In Progress"},
                "completed" : { value : "Completed"},
              }
            }),
            defaultValue : "Not Started"
          },
          clientId : {type : new GraphQLNonNull(GraphQLID)},
          
        } , 
        async resolve(parent , args){
          const project = await Project.create({
            name : args.name , 
            description : args.description ,
            status : args.status , 
            clientId : args.clientId       
          })
          return project
        }
      },
      deleteProject : {
        type : ProjectType, 
        args : {
          id : {type : new GraphQLNonNull(GraphQLID) },

        },
        async resolve(parent , args) {
          let project = await Project.findByIdAndDelete( args.id)
          return project
        }
      },
      editProject : {
        type : ProjectType, 
        args : {
          id : {type : new GraphQLNonNull(GraphQLID)},
          name : {type : GraphQLString},
          description : {type  : GraphQLString},
          status : {
            type : new GraphQLEnumType({
              name : "ProjectChange",
              values : {
                "new" : { value : "Not Started"},
                "progress" : { value : "In Progress"},
                "completed" : { value : "Completed"},
              }
            }),
          defaultValue : "Not Started"
          },
          clientId : {type : GraphQLID},


        },
        async resolve(parent , args){
          let project = await Project.findByIdAndUpdate(
            args.id , 
            {
              $set : {
                name : args.name , 
                description : args.description,
                status : args.status
              }
            }, 
            {new : true}
          )
          return project
        }
      }
  }),
  
}) 



module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation : RootMutations
});
