import { useEffect, useState } from 'react';
import { CustomAutocomplete } from '../../components/custom-select';
import { Box, Dialog, IconButton, Typography } from '@mui/material';
import { X } from 'lucide-react';
// import { AddUser } from './AddUser';
import { useUserBackend } from '../../hooks/useUserBackend';

export const UserSelect = ({ handleInputChange, value }) => {

    const { getUserBySearch } = useUserBackend()
    const [userOptions, setUserOptions] = useState([])
	const [openCreateDialog, setOpenCreateDialog] = useState(false);

	useEffect(() => {
        
	}, []);

    const handleUserSearchChange = (e) => {
        if (e?.target?.value) {
            getUserBySearch(e.target.value)
                .then((res) => {
                    setUserOptions(res.data)
                })
                .catch(err => alert('User search failed'));
        }
    }

	const openDialog = () => {
		setOpenCreateDialog(true);
	};

	const handleClose = () => {
		setOpenCreateDialog(false);
	};

	return (
		<>
			<CustomAutocomplete
				label="User"
				onChange={handleInputChange}
                onInputChange={handleUserSearchChange}
				name="user"
                value={value}
				mb={2}
				fullWidth
				addNewButton
				handleAddBtnClick={openDialog}
				options={userOptions}
                getOptionLabel={(x) => x ? x.name : ''}
                renderOption={(props, item) => (
                    <li {...props} key={item.email} >
                        {item.name}&nbsp;<span style={{ color: 'grey', fontSize: 10 }}>{item.email}</span>
                    </li>
                )}
			/>

			<Dialog
				open={openCreateDialog}
				onClose={handleClose}
				PaperProps={{
					// component: 'form',
					// onSubmit: event => {
					// 	event.preventDefault();
					// 	const formData = new FormData(event.currentTarget);
					// 	const formJson = Object.fromEntries(formData.entries());
					// 	const email = formJson.email;
					// 	console.log(email);
					// 	handleClose();
					// },
					sx: {
						maxWidth: '500px',
						background: '#f1f4f2',
						py: 2,
						px: 3,
						m: 2,
						borderRadius: '10px',
					},
				}}
			>
				<Box sx={{ textAlign: 'center' }}>
					<Box
						sx={{
							width: '100%',
							textAlign: 'right',
							// pb: 1,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Box sx={{ width: '40px', height: '40px' }} />

						<Typography
							variant="h2"
							sx={{ lineHeight: 1.3, textAlign: 'center' }}
						>
							Create new user
						</Typography>

						<IconButton
							aria-label="close dialog"
							onClick={handleClose}
							sx={{
								width: '40px',
								height: '40px',
								color: '#545555',
								transition: 'all 0.2s',
								'&:hover': {
									color: '#000',
								},
							}}
						>
							<X size={20} />
						</IconButton>
					</Box>

					{/* <AddUser handleClose={handleClose} /> */}
				</Box>
			</Dialog>
		</>
	);
};
