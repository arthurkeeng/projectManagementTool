const express = require("express");
const connectDB = require("./config/db.js")
const schema = require("./schema/schema.js");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();
const app = express();

port = 4200;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  connectDB()
  console.log("port listening on port ", port);
});
