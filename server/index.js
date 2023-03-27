const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const colors = require("colors");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

const app = express();

//Connect to database
connectDB();

app.use(cors());

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === "development",
	})
);

// go to localhost:5000/graphql and you can use graphiql, kind of like postman for testing graphql queries

app.listen(port, console.log(`Listening on port ${port}`));
