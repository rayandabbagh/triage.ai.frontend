import {
	Box,
	Stack,
	Typography,
} from '@mui/material';
import { CustomFilledInput } from '../../components/custom-input';
import { useEffect, useState } from 'react';
import { CircularButton } from '../../components/sidebar';
import { useTicketBackend } from '../../hooks/useTicketBackend';
import { useAgentBackend } from '../../hooks/useAgentBackend';
import { DepartmentSelect } from '../department/DepartmentSelect';
import { UserSelect } from '../user/UserSelect';
import { AgentSelect } from '../agent/AgentSelect';
import { SLASelect } from '../sla/SLASelect';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { StatusSelect } from '../status/StatusSelect';
import { PrioritySelect } from '../priority/PrioritySelect';
import { GroupSelect } from '../group/GroupSelect';
import { TopicSelect } from '../topic/TopicSelect'
import { FormInput } from '../forms/FormInput';
import { useFormBackend } from '../../hooks/useFormBackend'

dayjs.extend(utc)

export const AddTicket = ({ handleTicketCreated, handleTicketEdited, editTicket }) => {
	const { createAgent, updateAgent } = useAgentBackend();
	const { createTicket, updateTicket, getTicketForms } = useTicketBackend();
	const { getFormById } = useFormBackend();

	const [forms, setForms] = useState([])
	const [formFields, setFormFields] = useState([])
	const [formValues, setFormValues] = useState({})

	const [isFormValid, setIsFormValid] = useState(false);
	const [formData, setFormData] = useState({
		user: null,
		agent: null,
		description: '',
		title: '',
		dept_id: '',
		sla_id: '',
		status_id: '',
		priority_id: '',
		topic_id: '',
		group_id: '',
		due_date: null,
		form_id: null,
	});

	useEffect(() => {
		getTicketForms()
			.then(res => {
				setForms(res.data)
			})
			.catch(err => console.log(err))
	}, [])

	useEffect(() => {
		const isValid = validateTicket();
		setIsFormValid(isValid);
	}, [formData, formValues]);

	useEffect(() => {
		if (editTicket) {
			const form_id = editTicket?.form_entry?.form_id
			setFormData({...editTicket, form_id: form_id});
			if (form_id) {
				getFormById(form_id)
					.then((res) => {
						setFormFields(res.data.fields)
						var values = {}
						editTicket.form_entry.values.map(value => {
							const field = res.data.fields.find((field) => field.field_id === value.field_id)
							values[field.name] = value.value
						})
						setFormValues(values)
				})
			}

		}
	}, [editTicket]);

	const setupForm = (topic_id) => {
		const values = {}
		const form = forms.find((form) => form.topic_id == topic_id)?.form

		form?.fields?.map((field) => {
			values[field.name] = ''
		})
		setFormValues(values)
		setFormFields(form?.fields ?? [])
		setFormData(prev => ({
			...prev,
			form_id: form?.form_id,
		}));
			
	}

	const prepareNewTicketFormData = () => {

		const form_values = []
		for (const item of formFields) {
			form_values.push({
				field_id: item.field_id,
				form_id: formData.form_id,
				value: formValues[item.name]
			})
		}
		return {
			agent_id: formData.agent?.agent_id,
			user_id: formData.user?.user_id,
			description: formData.description,
			title: formData.title,
			dept_id: formData.dept_id ? formData.dept_id : null,
			sla_id: formData.sla_id ? formData.sla_id : null,
			status_id: formData.status_id ? formData.status_id : null,
			priority_id: formData.priority_id ? formData.priority_id : null,
			topic_id: formData.topic_id ? formData.topic_id : null,
			group_id: formData.group_id ? formData.group_id : null,
			due_date: formData.due_date,
			form_values: form_values
		}
	}

	const prepareEditTicketFormData = () => {

		const form_values = []
		const field_to_value_map = {}
		if (formFields.length) {
			editTicket.form_entry.values.map(value =>{
				field_to_value_map[value.field_id] = value.value_id
			})
		}
		for (const item of formFields) {
			form_values.push({
				field_id: item.field_id,
				value_id: field_to_value_map[item.field_id],
				value: formValues[item.name]
			})
		}
		return {
			ticket_id: formData.ticket_id,
			agent_id: formData.agent?.agent_id,
			user_id: formData.user?.user_id,
			description: formData.description,
			title: formData.title,
			dept_id: formData.dept_id ? formData.dept_id : null,
			sla_id: formData.sla_id ? formData.sla_id : null,
			status_id: formData.status_id ? formData.status_id : null,
			priority_id: formData.priority_id ? formData.priority_id : null,
			topic_id: formData.topic_id ? formData.topic_id : null,
			group_id: formData.group_id ? formData.group_id : null,
			due_date: formData.due_date,
			form_values: form_values
		}
	}

	const validateTicket = () => {
		var valid = true
		for (const key in formValues) {
			if (!formValues[key]) {
				valid = false
				break
			}
		}

		return valid && formData.user && formData.description && formData.title && formData.topic_id
	}

	const handleDueDateChange = (newValue) => {
		setFormData({ ...formData, 'due_date': newValue ? newValue.utc().format('YYYY-MM-DDTHH:mm:ss') : null })
	}

	const handleFormChange = e => {
		const { name, value } = e.target;
		setFormValues(prev => ({
			...prev,
			[name]: value,
		}));
	}

	const handleInputChange = e => {
		const { name, value } = e.target;
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleUserChange = (e, newValue) => {
		setFormData(prevFormData => ({
			...prevFormData,
			'user': newValue,
		}));
	}

	const handleAgentChange = (e, newValue) => {
		setFormData(prevFormData => ({
			...prevFormData,
			'agent': newValue,
		}));
	}

	const handleAction = () => {
		if (editTicket) {
			updateTicket(prepareEditTicketFormData(formData))
				.then(res => {
					handleTicketEdited();
				})
				.catch(err => console.error(err));
		} else {
			createTicket(prepareNewTicketFormData(formData))
				.then(res => {
					handleTicketCreated();
				})
				.catch(err => console.error(err));
		}
	};

	return (
		<>
			<Typography
				variant="h1"
				sx={{ mb: 1.5 }}
			>
				Add new ticket
			</Typography>

			<Typography variant="subtitle2">
				We will gather essential details about the new ticket. Please fill out the following information.
			</Typography>


			<Box
				sx={{
					background: '#FFF',
					m: 4,
					p: 4,
					pt: 3,
					borderRadius: '12px',
					textAlign: 'left',
				}}
			>
				<Typography
					variant="h4"
					sx={{ fontWeight: 600, mb: 2 }}
				>
					Required information
				</Typography>

				<UserSelect
					name='user'
					handleInputChange={handleUserChange}
					value={formData.user ?? ''}
					mb={2}
				/>

				<TopicSelect
					handleInputChange={(e) => {
						handleInputChange(e)
						if (!editTicket) {
							setupForm(e.target.value)
						}
					}}
					value={formData.topic_id ?? ''}
				/>

				<CustomFilledInput
					label="Title"
					onChange={handleInputChange}
					value={formData.title}
					name="title"
					fullWidth
					mb={2}
				/>

				<CustomFilledInput
					label="Description"
					onChange={handleInputChange}
					value={formData.description}
					name="description"
					mb={2}
					fullWidth
					multiline
					rows={5}
				/>

				{formFields?.length !== 0 && 
					formFields.map((formField) => (
						<FormInput
							value={formValues[formField.name] ?? ''}
							key={formField.field_id}
							formField={formField}
							handleInputChange={handleFormChange}
						/>
					))

				}

				<Typography
					variant="h4"
					sx={{ fontWeight: 600, mb: 2 }}
				>
					Optional information
				</Typography>

				<AgentSelect
					name='agent'
					handleInputChange={handleAgentChange}
					value={formData.agent ?? ''}
					mb={2}
				/>

				<DepartmentSelect
					handleInputChange={handleInputChange}
					value={formData.dept_id ?? ''}
				/>

				<SLASelect
					handleInputChange={handleInputChange}
					value={formData.sla_id ?? ''}
				/>

				<StatusSelect
					handleInputChange={handleInputChange}
					value={formData.status_id ?? ''}
				/>

				<PrioritySelect
					handleInputChange={handleInputChange}
					value={formData.priority_id ?? ''}
				/>

				<GroupSelect
					handleInputChange={handleInputChange}
					value={formData.group_id ?? ''}
				/>

				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateTimePicker
						timezone='UTC'
						defaultValue={formData.due_date ? dayjs(formData.due_date) : null}
						onChange={handleDueDateChange}
						slotProps={{ field: { clearable: true } }}
						sx={{
							width: 275,
							m: 1,
							'& .MuiInputBase-root': {
								fontWeight: 600,
							},
							'.MuiOutlinedInput-notchedOutline': {
								borderRadius: '8px',
								borderColor: '#E5EFE9',
							},
						}}
					/>
				</LocalizationProvider>


			</Box>



			<Stack
				direction="row"
				// spacing={1.5}
				sx={{ justifyContent: 'center' }}
			>

				<CircularButton
					sx={{ py: 2, px: 6 }}
					onClick={handleAction}
					disabled={!isFormValid}
				>
					{editTicket ? 'Edit' : 'Create'} ticket
				</CircularButton>
			</Stack>
		</>
	);
};
