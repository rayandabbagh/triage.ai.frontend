import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useTicketBackend = () => {
	const { agentAuthState, userAuthState } = useContext(AuthContext);

	const getTicketsbyAdvancedSearch = async (adv_search) => {
		const config = {
			headers: { Authorization: `Bearer ${agentAuthState.token}` },
		};
		const page = adv_search.page;
		const size = adv_search.size;
		const payload = {
			filters: adv_search.filters,
			sorts: adv_search.sorts,
		};

		return await axios.post(
			process.env.REACT_APP_BACKEND_URL +
				`ticket/adv_search?size=${size}&page=${page}`,
			payload,
			config
		);
	};

	const getTicketsbyAdvancedSearchForUser = async (adv_search) => {
		const config = {
			headers: { Authorization: `Bearer ${userAuthState.token}` },
		};
		const page = adv_search.page;
		const size = adv_search.size;
		const payload = {
			filters: adv_search.filters,
			sorts: adv_search.sorts,
		};

		return await axios.post(
			process.env.REACT_APP_BACKEND_URL +
				`ticket/adv_search/user?size=${size}&page=${page}`,
			payload,
			config
		);
	};

	const getTicketById = async (id) => {
		const config = {
			headers: { Authorization: `Bearer ${agentAuthState.token}` },
		};

		return await axios.get(
			process.env.REACT_APP_BACKEND_URL + `ticket/id/${id}`,
			config
		);
	};

	const getTicketByIdForUser = async (id) => {
		const config = {
			headers: { Authorization: `Bearer ${userAuthState.token}` },
		};

		return await axios.get(
			process.env.REACT_APP_BACKEND_URL + `ticket/user/id/${id}`,
			config
		);
	};

	const getTicketForms = async () => {
		const config = {
			headers: { Authorization: `Bearer ${agentAuthState.token}` },
		};

		return await axios.get(
			process.env.REACT_APP_BACKEND_URL + "ticket/form/",
			config
		);
	};

	const createTicket = async (ticketInfo) => {
		const config = {
			headers: { Authorization: `Bearer ${agentAuthState.token}` },
		};

		return await axios.post(
			process.env.REACT_APP_BACKEND_URL + "ticket/create",
			ticketInfo,
			config
		);
	};

	const createTicketForUser = async (ticketInfo) => {
		const config = {
			headers: { Authorization: `Bearer ${userAuthState.token}` },
		};

		return await axios.post(
			process.env.REACT_APP_BACKEND_URL + "ticket/create/user",
			ticketInfo,
			config
		);
	};

	const updateTicket = async (ticketInfo) => {
		const config = {
			headers: { Authorization: `Bearer ${agentAuthState.token}` },
		};

		return await axios.put(
			process.env.REACT_APP_BACKEND_URL +
				"ticket/update/" +
				ticketInfo.ticket_id,
			ticketInfo,
			config
		);
	};

	const updateTicketForUser = async (ticketInfo) => {
		const config = {
			headers: { Authorization: `Bearer ${userAuthState.token}` },
		};

		return await axios.put(
			process.env.REACT_APP_BACKEND_URL +
				"ticket/user/update/" +
				ticketInfo.ticket_id,
			ticketInfo,
			config
		);
	};

	return {
		getTicketsbyAdvancedSearch,
		getTicketsbyAdvancedSearchForUser,
		getTicketById,
		getTicketByIdForUser,
		getTicketForms,
		createTicket,
		createTicketForUser,
		updateTicket,
		updateTicketForUser,
	};
};
