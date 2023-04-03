import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

const ClientRow = ({ client }) => {
	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: { id: client.id },
		// to update the UI once a client is deleted, do this. However, this isn't perfect, especially if you're calling that a lot. So instead you can update the cache.
		// refetchQueries: [{ query: GET_CLIENTS }],
		// second way to update the UI, using cache. This will produce a warning in the console, saying that you need to define a custom merge function to safey merge objects. To fix, edit code in app.js
		update(cache, { data: { deleteClient } }) {
			const { clients } = cache.readQuery({ query: GET_CLIENTS });
			cache.writeQuery({
				query: GET_CLIENTS,
				data: {
					clients: clients.filter((client) => client.id !== deleteClient.id),
				},
			});
		},
	});
	return (
		<tr>
			<td>{client.name}</td>
			<td>{client.email}</td>
			<td>{client.phone}</td>
			<td>
				<button className="btn btn-danger btn-sm" onClick={deleteClient}>
					<FaTrash />
				</button>
			</td>
		</tr>
	);
};

export default ClientRow;
