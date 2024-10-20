import { Box, Select, Typography, styled, Tabs, Tab } from '@mui/material';
import { WhiteContainer } from '../../components/white-container';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { GeneralSettings } from './system/GeneralSettings';
import { DateAndTime } from './system/DateTimeSettings';
import { SystemLanguages } from './system/SystemLanguages';
import { Attachments } from './system/AttachmentsSettings';
import { BasicInformation } from './company/CompanyBasicInfo';
import { TicketSettings } from './tickets/TicketSettings';
import { Queues } from './tickets/Queues';
import { Autoresponder } from './tickets/AutoResponder';
import { AlertsAndNotices } from './tickets/AlertsAndNotices';
import { TaskSettings } from './tasks/TaskSettings';
import { TaskAlertsAndNotices } from './tasks/TasksAlertsAndNotices';
import { AgentSettings } from './agents/AgentSettings';
import { AgentTemplates } from './agents/AgentTemplates';
import { UserSettings } from './users/UserSettings';
import { UserTemplates } from './users/UserTemplates';
import { KnowledgebaseSettings } from './knowledgebase/KnowledgebaseSettings';

export const handleSave = async (data, setLoading, setCircleLoading, settingsData, updateSettings, refreshSettings) => {
	try {
		var updates = [];
		Object.entries(data).forEach((k) => {
			console.log(settingsData);
			var row = settingsData[k[0]];
			row.value = k[1];
			updates.push(row);
		});
		console.log(updates);
		setCircleLoading(true);
		await updateSettings(updates);
		await refreshSettings();
		setCircleLoading(false);
		setLoading(true);
		// window.location.reload();
	} catch (err) {
		console.error('Error saving settings:', err);
	}
};

export const StyledSelect = styled((props) => (
	<Select
		{...props}
		IconComponent={(props) => <ChevronDown {...props} size={17} color='#1B1D1F' />}
		renderValue={(item) => (
			<Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
				{props.array ? props.array[item] : item}
			</Typography>
		)}
	/>
))({
	'.MuiOutlinedInput-notchedOutline': {
		borderRadius: '12px',
		borderColor: '#E5EFE9',
	},
	'&:hover': {
		'&& fieldset': {
			borderColor: '#22874E',
		},
	},
});

const StyledTabs = styled((props) => <Tabs {...props} TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }} />)({
	'& .Mui-selected': {
		color: '#22874E',
	},
	'& .MuiTabs-indicator': {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		height: '2px',
	},
	'& .MuiTabs-indicatorSpan': {
		width: '100%',
		height: '2px',
		backgroundColor: '#22874E',
	},
});

const Header = ({ headers, components }) => {
	// const [menuState, setMenuState] = useState(headers[0].id);
	const [tabValue, setTabValue] = useState(0);

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	// const handleMenuChange = newMenuState => {
	// 	setMenuState(newMenuState);
	// };

	return (
		<Box>
			{/* Tab Bar */}
			<Box
				sx={{
					display: 'flex',
					mb: 4,
				}}
			>
				<StyledTabs
					value={tabValue}
					onChange={handleTabChange}
					variant='scrollable'
					scrollButtons='auto'
					sx={{
						position: 'relative',
						width: '100%',
						':after': {
							content: '""',
							position: 'absolute',
							left: 0,
							bottom: 0,
							width: '100%',
							height: '2px',
							background: '#E5EFE9',
							zIndex: -1,
						},
					}}
				>
					{headers.map((header) => (
						<Tab label={header.label} sx={{ textTransform: 'none', p: 0, mr: 5 }} />
					))}
				</StyledTabs>
			</Box>

			{/* Tab Content */}
			<WhiteContainer noPadding>
				<Box sx={{ padding: 2 }}>{components[tabValue]}</Box>
			</WhiteContainer>
		</Box>
	);
};

export const SystemMenu = (props) => {
	const headers = [
		{ id: 1, label: 'General Settings' },
		{ id: 2, label: 'Date & Time Options' },
		{ id: 3, label: 'System Languages' },
		{ id: 4, label: 'Attachment Storage & Settings' },
	];

	const components = [<GeneralSettings {...props} />, <DateAndTime {...props} />, <SystemLanguages {...props} />, <Attachments {...props} />];

	return <Header headers={headers} components={components} />;
};

export const CompanyMenu = (props) => {
	const headers = [
		{ id: 1, label: 'Basic Information' },
		// { id: 2, label: 'Site Pages' },
		// { id: 3, label: 'Logos' },
		// { id: 4, label: 'Login Backdrop' },
	];

	const components = [
		<BasicInformation {...props} />,
		// 2: <SitePages {...props} />,
		// 3: <Logos {...props} />,
		// 4: <LoginBackdrop {...props} />
	];

	return <Header headers={headers} components={components} />;
};

export const TicketMenu = (props) => {
	const headers = [
		{ id: 1, label: 'Settings' },
		{ id: 2, label: 'Autoresponder' },
		{ id: 3, label: 'Alerts & Notices' },
		// { id: 4, label: 'Queues' },
	];

	const components = [
		<TicketSettings {...props} />,
		<Autoresponder {...props} />,
		<AlertsAndNotices {...props} />,
		// <Queues {...props} />,
	];
	return <Header headers={headers} components={components} />;
};

export const TaskMenu = (props) => {
	const headers = [
		{ id: 1, label: 'Settings' },
		{ id: 2, label: 'Alerts & Notices' },
	];

	const components = [<TaskSettings {...props} />, <TaskAlertsAndNotices {...props} />];

	return <Header headers={headers} components={components} />;
};

export const AgentMenu = (props) => {
	const headers = [
		{ id: 1, label: 'Settings' },
		{ id: 2, label: 'Templates' },
	];

	const components = [<AgentSettings {...props} />, <AgentTemplates {...props} />];

	return <Header headers={headers} components={components} />;
};

export const UserMenu = (props) => {
	const headers = [
		{ id: 1, label: 'Settings' },
		{ id: 2, label: 'Templates' },
	];

	const components = [<UserSettings {...props} />, <UserTemplates {...props} />];

	return <Header headers={headers} components={components} />;
};

export const KnowledgebaseMenu = (props) => {
	const headers = [
		{ id: 1, label: 'Settings' },
	];

	const components = [<KnowledgebaseSettings {...props} />];

	return <Header headers={headers} components={components} />;
};
