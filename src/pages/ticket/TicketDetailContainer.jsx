import { Box, Fab, styled, Tab, Tabs, Typography } from '@mui/material';
import { MessageCircle, MessageSquareText, NotepadText } from 'lucide-react';
import { useState } from 'react';
import { TicketDetail } from './TicketDetail';

const CircularTab = styled(Tab)(() => ({
	width: '44px',
	height: '44px',
	minWidth: '44px',
	minHeight: '44px',
	borderRadius: '50px',
	background: '#FFF',
	border: '1px solid #E5EFE9',
	padding: 0,
	color: '#6E7772',
	'&.Mui-selected': {
		border: '1.5px solid #22874E',
		color: '#22874E',
	},
	'&:hover': {
		background: '#E8EFEA',
	},
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Box
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			sx={{
				width: 'calc(100% - 80px)',
				background: '#fff',
				borderTopLeftRadius: '24px',
				borderBottomLeftRadius: '24px',
			}}
			{...other}
		>
			{value === index && children}
		</Box>
	);
}

export const TicketDetailContainer = ({ ticketInfo, closeDrawer }) => {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ height: '100%' }}>
			<Box sx={{ flexGrow: 1, display: 'flex', height: '100%' }}>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={value}
					onChange={handleChange}
					aria-label="Vertical tabs example"
					sx={{ padding: '24px 18px' }}
					TabIndicatorProps={{
						style: { display: 'none' },
					}}
				>
					<CircularTab
						icon={
							<NotepadText
								size={22}
								strokeWidth={1.5}
							/>
						}
						aria-label="Details"
						sx={{ marginBottom: '12px' }}
					/>

					<CircularTab
						icon={
							<MessageSquareText
								size={22}
								strokeWidth={1.5}
							/>
						}
						aria-label="Details"
					/>
				</Tabs>
				<TabPanel
					value={value}
					index={0}
				>
					<TicketDetail
						ticketInfo={ticketInfo}
						closeDrawer={closeDrawer}
					/>
				</TabPanel>
				<TabPanel
					value={value}
					index={1}
				>
					Item Two
				</TabPanel>
			</Box>
		</Box>
	);
};