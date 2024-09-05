import { TextField, alpha, styled } from '@mui/material';

const CustomInput = styled(props => (
	<TextField
		InputProps={{
			disableUnderline: true,
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiFilledInput-root': {
		overflow: 'hidden',
		borderRadius: 12,
		backgroundColor: 'transparent',
		border: '1.5px solid #bcc2bf',
		transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
		fontSize: '0.9375rem',
		fontWeight: 500,
		'&:hover': {
			backgroundColor: 'transparent',
			borderColor: '#22874E',
		},
		'&.Mui-focused': {
			backgroundColor: 'transparent',
			borderColor: '#22874E',
		},
	},
	'& label.Mui-focused': {
		color: '#545555',
	},
}));

export const CustomFilledInput = ({ label, halfWidth, endAdornment, ...props }) => {
	return (
		<CustomInput
			variant="filled"
			label={label}
			sx={{ mt: props.mt, mb: props.mb, mr: props.mr, width: halfWidth && '49%' }}
			InputProps={{ disableUnderline: true, endAdornment }}
			{...props}
		/>
	);
};