import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useTicketBackend = () => {
	const { agentAuthState } = useContext(AuthContext);

	const getTicketsbyAdvancedSearch = async (adv_search) => {
		const config = {
			headers: { Authorization: `Bearer ${agentAuthState.token}` }
		};
		const page = adv_search.page
		const size = adv_search.size
		const payload = {'filters': adv_search.filters, 'sorts': adv_search.sorts}

		return await axios.post(
			process.env.REACT_APP_BACKEND_URL + `ticket/adv_search?size=${size}&page=${page}`,
			payload,
			config
		);
	}

	const getTicketById = async id => {
		const config = {
			headers: { Authorization: `Bearer ${agentAuthState.token}` },
		};

		return await axios.get(process.env.REACT_APP_BACKEND_URL + `ticket/id/${id}`, config);
	};

	const getTicketForms = async () => {
		const config = {
			headers: { Authorization: `Bearer ${agentAuthState.token}` },
		};

		return await axios.get(process.env.REACT_APP_BACKEND_URL + 'ticket/form/', config);
	}

	const createTicket = async ticketInfo => {
		const config = {
			headers: { Authorization: `Bearer ${agentAuthState.token}` },
		};

		return await axios.post(
			process.env.REACT_APP_BACKEND_URL + 'ticket/create',
			ticketInfo,
			config
		);
	};

	const updateTicket = async (ticketInfo) => {
		const config = {
			headers: { Authorization: `Bearer ${agentAuthState.token}` },
		};

		return await axios.put(
			process.env.REACT_APP_BACKEND_URL + 'ticket/update/' + ticketInfo.ticket_id,
			ticketInfo,
			config
		);
	};
	
	const getTicketBetweenDates = async (start_date, end_date) => {
		const config = {
			headers: { Authorization: `Bearer ${agentAuthState.token}` },
		};

		return await axios.get(process.env.REACT_APP_BACKEND_URL + `ticket/dates?start=${start_date}&end=${end_date}`, config);
	};

	const getDashboardStats = async (start_date, end_date, category) => {
		const config = {
			headers: { Authorization: `Bearer ${agentAuthState.token}` },
		};

		return await axios.get(process.env.REACT_APP_BACKEND_URL + `ticket/${category}/dates?start=${start_date}&end=${end_date}`, config);
	};

	return { getTicketsbyAdvancedSearch, getTicketById, getTicketForms, createTicket, updateTicket, getTicketBetweenDates, getDashboardStats };

};
