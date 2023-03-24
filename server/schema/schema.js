const { projects, clients } = require("../sampleData");

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
} = require("graphql");

//Client Type
const ProjectType = new GraphQLObjectType({
	name: "Project",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		status: { type: GraphQLString },
		client: {
			type: ClientType,
			resolve(parent, args) {
				return clients.find((client) => client.id === parent.clientId);
			},
		},
	}),
});

//Client Type
const ClientType = new GraphQLObjectType({
	name: "Client",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		// get all clients
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				return projects;
			},
		},
		// get one client based on id
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return projects.find((project) => project.id === args.id);
			},
		},
		// get all clients
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parent, args) {
				return clients;
			},
		},
		// get one client based on id
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return clients.find((client) => client.id === args.id);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
