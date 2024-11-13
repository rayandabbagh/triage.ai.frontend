import { Box, Checkbox, deprecatedPropType, FormControlLabel, Stack, Typography } from '@mui/material';
import { CircularButton } from '../../components/sidebar';
import { CustomSelect } from '../../components/custom-select';
import { useEffect, useState } from 'react';
import { useSLABackend } from '../../hooks/useSLABackend';
import { useScheduleBackend } from '../../hooks/useScheduleBackend';
import { CustomFilledInput } from '../../components/custom-input';
import { useTopicBackend } from '../../hooks/useTopicBackend';
import { useData } from '../../context/DataContext';
import { useNotification } from '../../hooks/useNotification';
import { AgentSelect } from '../agent/AgentSelect';
import { SLASelect } from '../sla/SLASelect';
import { ScheduleSelect } from '../schedule/ScheduleSelect';
import { FormSelect } from '../form/FormSelect';
import { StatusSelect } from '../status/StatusSelect';
import { PrioritySelect } from '../priority/PrioritySelect';
import { GroupSelect } from '../group/GroupSelect';
import { DepartmentSelect } from '../department/DepartmentSelect';

export const AddTopic = ({ handleCreated, handleEdited, editTopic }) => {
	const { createTopic, updateTopic } = useTopicBackend();

	const [manager, setManager] = useState(null);
	const [isFormValid, setIsFormValid] = useState(false)

	const [formData, setFormData] = useState({
		auto_resp: false,
		status_id: '',
		dept_id: '',
		priority_id: '',
		agent_id: '',
		group_id: '',
		sla_id: '',
		form_id: '',
		topic: '',
		notes: ''
	});

	const validateForm = () => {
		return formData.topic !== ''
	}


	useEffect(() => {
		if (editTopic) {
			setFormData({...editTopic, auto_resp: editTopic.auto_resp === 1 ? true : false})
			setManager(editTopic.manager)
		}

	}, [editTopic]);

	const prepareFormData = () => {
		const { auto_resp, status_id, dept_id, priority_id, agent_id, group_id, sla_id, form_id, topic, notes, topic_id } = formData
		return {
			auto_resp: auto_resp ? 1 : 0,
			status_id: status_id === '' ? null : status_id,
			dept_id: dept_id === '' ? null : dept_id,
			priority_id: priority_id === '' ? null : priority_id,
			agent_id: agent_id === '' ? null : agent_id,
			group_id: group_id === '' ? null : group_id,
			sla_id: sla_id === '' ? null : sla_id,
			form_id: form_id === '' ? null : form_id,
			notes: notes,
			topic: topic,
			...(editTopic && { topic_id: topic_id })
		}
	}

	useEffect(() => {
		setIsFormValid(validateForm())
	}, [formData]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleCheckboxChange = e => {
		const { name, checked } = e.target;
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: checked,
		}));
	};

	const handleManagerChange = (e, newValue) => {
		setManager(newValue)
		setFormData(p => ({ ...p, agent_id: newValue?.agent_id ?? '' }))
	}

	const handleAction = () => {
		if (editTopic) {
			updateTopic(prepareFormData(formData))
				.then(res => {
					handleEdited();
				})
				.catch(err => console.error(err));
		} else {
			createTopic(prepareFormData(formData))
				.then(res => {
					handleCreated();
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
				{editTopic ? 'Edit topic' : 'Add new topic'}
			</Typography>

			<Typography variant="subtitle2">
				{editTopic ? 'Edit the details for this topic' : 'We will gather essential details about the new topic. Complete the following steps to ensure accurate setup and access.'}
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
					Topic information
				</Typography>

				<CustomFilledInput
					label="Name"
					onChange={handleInputChange}
					value={formData.topic}
					name="topic"
					mb={2}
					fullWidth
				/>

				<StatusSelect
					handleInputChange={handleInputChange}
					value={formData.status_id ?? ''}
				/>

				<PrioritySelect
					handleInputChange={handleInputChange}
					value={formData.priority_id ?? ''}
				/>

				<DepartmentSelect
					handleInputChange={handleInputChange}
					value={formData.dept_id ?? ''}
				/>

				<GroupSelect
					handleInputChange={handleInputChange}
					value={formData.group_id ?? ''}
				/>

				<SLASelect
					handleInputChange={handleInputChange}
					value={formData.sla_id ?? ''}
				/>

				<AgentSelect
					name='manager'
					handleInputChange={handleManagerChange}
					value={manager ?? ''}
					mb={2}
				/>

				<FormSelect
					handleInputChange={handleInputChange}
					value={formData.form_id ?? ''}
				/>


				<CustomFilledInput
					label="Notes"
					onChange={handleInputChange}
					value={formData.notes ?? ''}
					name="notes"
					fullWidth
					multiline
					rows={3}
				/>

				<FormControlLabel
					name="auto_resp"
					control={
						<Checkbox
							checked={formData.auto_resp}
							onChange={handleCheckboxChange}
						/>
					}
					label={
						<Typography
							variant="subtitle1"
							sx={{ fontWeight: 500 }}
						>
							Auto Responder
						</Typography>
					}
				/>

			</Box>

			<Stack
				direction="row"
				spacing={1.5}
				sx={{ justifyContent: 'center' }}
			>
				<CircularButton
					sx={{ py: 2, px: 6 }}
					onClick={handleAction}
					disabled={!isFormValid}
				>
					{editTopic ? 'Edit' : 'Create'} topic
				</CircularButton>
			</Stack>
		</>
	);
};
