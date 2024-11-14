import { useTheme } from '@emotion/react';
import {
	Box,
	Button, CssBaseline,
	Dialog,
	Drawer,
	IconButton,
	Slide,
	Typography, styled,
	useMediaQuery
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { LogOut, Menu, X } from 'lucide-react';
import React, { forwardRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AppBarHeight } from './layout';
import { SidebarItems } from './sidebar-items';

export const drawerWidth = 250;

const AppBar = styled(MuiAppBar)(({ theme }) => ({
	zIndex: theme.zIndex.drawer - 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	backgroundColor: '#f1f4f2',
	// backgroundColor: '#F3F8F5',
	boxShadow: 'none',
	color: '#1B1D1F',
	// borderBottom: '1px solid #F4F4F4',
}));

export const CircularButton = styled(Button)(() => ({
	backgroundColor: '#22874E',
	color: '#FFF',
	borderRadius: '50px',
	fontSize: '0.9375rem',
	fontWeight: 600,
	lineHeight: 1.1,
	textTransform: 'unset',
	padding: '8px 20px',
	'&:hover': {
		backgroundColor: '#29b866',
	},
	'& svg': {
		marginRight: '6px',
		// marginBottom: 2,
	},
	'&:disabled': {
		color: '#FFF',
		opacity: 0.38,
	},
}));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
// 	({ theme, open }) => ({
// 		width: drawerWidth,
// 		flexShrink: 0,
// 		whiteSpace: 'nowrap',
// 		boxSizing: 'border-box',
// 		...(!open && {
// 			...closedMixin(theme),
// 			'& .MuiDrawer-paper': closedMixin(theme),
// 		}),
// 	})
// );

export const Transition = forwardRef(function Transition(props, ref) {
	return (
		<Slide
			direction="up"
			ref={ref}
			{...props}
		/>
	);
});

export const Header = ({
	appBarTitle,
	appBarSubtitle,
	buttonInfo,
	AddResource,
	refreshResource
}) => {

	const [mobileOpen, setMobileOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const initialTime = 10; // in seconds
	const [timeLeft, setTimeLeft] = useState(initialTime);
	const navigate = useNavigate();

	const { agentLogout } = useContext(AuthContext);

	const theme = useTheme();
	const [openDialog, setOpenDialog] = useState(false);
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const handleDrawerClose = () => {
		setIsClosing(true);
		setMobileOpen(false);
	};

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false);
	};

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen);
		}
	};

	const authLogout = async () => {
		agentLogout();
		navigate('/', { replace: true });
	};

	const handleClickDialogOpen = () => {
		setOpenDialog(true);
	};

	const handleDialogClose = () => {
		setOpenDialog(false);
	};

	const handleCreated = () => {
		handleDialogClose()
		refreshResource()
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />

            <Box
				component="nav"
				sx={{
					width: { md: drawerWidth },
					flexShrink: { md: 0 },
				}}
				aria-label="mailbox folders"
			></Box>

			<AppBar
				position="fixed"
				sx={{
					width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
					ml: `${drawerWidth}px`,
				}}
			>
				<Box
					sx={{
						height: AppBarHeight,
						display: 'flex',
						alignItems: appBarSubtitle !== '' ? 'flex-start' : 'center',
						justifyContent: 'space-between',
						py: { xs: 1, md: 3 },
						px: { xs: 2, md: 5 },
					}}
				>
					<Box
						sx={{ display: 'flex', alignItems: appBarSubtitle !== '' ? 'flex-start' : 'center' }}
					>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { md: 'none' } }}
						>
							<Menu />
						</IconButton>

						<Box sx={{ display: 'flex', flexDirection: 'column', color: '#1B1D1F' }}>
							<Typography variant="h2">{appBarTitle}</Typography>
							{appBarSubtitle !== '' && (
								<Typography
									variant="subtitle2"
									sx={{
										letterSpacing: '-0.03em',
										lineHeight: 1.9,
										color: '#545555',
									}}
								>
									{appBarSubtitle}
								</Typography>
							)}
						</Box>
					</Box>

					<Box sx={{ display: 'flex', alignItems: 'center' }}>

						{buttonInfo.hidden !== false && <CircularButton
							sx={{ mr: 1 }}
							onClick={handleClickDialogOpen}
						>
							{buttonInfo.icon}
							{buttonInfo.label}
						</CircularButton>}

						<IconButton
							aria-label="logout"
							onClick={authLogout}
						>
							<LogOut
								color="#585858"
								size={22}
							/>
						</IconButton>
					</Box>
				</Box>
			</AppBar>

			<Dialog
				open={openDialog}
				TransitionComponent={Transition}
				onClose={handleDialogClose}
				// maxWidth={'xl'}
				// fullWidth
				// fullScreen={fullScreen}
				PaperProps={{
					sx: {
						width: '100%',
						maxWidth: 'unset',
						height: 'calc(100% - 64px)',
						maxHeight: 'unset',
						margin: 0,
						background: '#f1f4f2',
						borderBottomLeftRadius: 0,
						borderBottomRightRadius: 0,
						padding: 2,
					},
				}}
				sx={{ '& .MuiDialog-container': { alignItems: 'flex-end' } }}
			>
				<Box sx={{ maxWidth: '650px', margin: '14px auto 0px', textAlign: 'center' }}>
					<IconButton
						aria-label="close dialog"
						onClick={handleDialogClose}
						sx={{
							width: '40px',
							height: '40px',
							position: 'fixed',
							right: '26px',
							top: 'calc(64px + 26px)',
							color: '#545555',
							transition: 'all 0.2s',
							'&:hover': {
								color: '#000',
							},
						}}
					>
						<X size={20} />
					</IconButton>

					{AddResource && <AddResource handleCreated={handleCreated} />}
				</Box>

			</Dialog>

		</Box>
	);
};