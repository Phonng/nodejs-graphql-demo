const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();

mongoose.connect("mongodb://localhost:27017/hapo_ams_test", { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  // console.log("connection to datbase");
});

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  // console.log("now listening for request on port 4000");
});
